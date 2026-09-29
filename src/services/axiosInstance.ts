import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { getAccessToken, getRefreshToken, saveTokens, clearSession } from '@/lib/auth/session'
import { useAuthStore } from '@/store/useAuthStore'
import type { AuthTokens } from '@/types/auth'
import type { UnwrappedApi } from '@/types/api'

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/tiktak`

const api = axios.create({
  baseURL: BASE_URL,
  // Cavab verməyən server sonsuza qədər gözlənilməsin — timeout-da error.response olmur,
  // yəni getErrorMessage "Serverə qoşulmaq mümkün olmadı" qaytarır
  timeout: 30000,
  headers: { 'Accept-Language': 'az' },
})

api.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Declared to return AxiosResponse only to satisfy axios's interceptor typing —
// at runtime this unwraps the `{data}` envelope to the raw payload. The real
// public contract callers see is `UnwrappedApi` (the `as unknown as UnwrappedApi`
// cast on the default export below), not this function's nominal return type.
// A list endpoint that actually paginates server-side (currently only
// `/admin/products` with `?limit&page`) sends `pagination` as a sibling of
// `data`, not nested inside it — the plain `data ?? body` unwrap below would
// silently drop that metadata, so it's preserved as `{ data, pagination }`
// whenever the body carries it; every other endpoint has no `pagination` key
// and is unaffected.
const handleSuccess = (response: AxiosResponse) => {
  const body = response.data
  if (body && typeof body === 'object' && 'pagination' in body) {
    return { data: body.data, pagination: body.pagination } as unknown as AxiosResponse
  }
  return (body.data ?? body) as AxiosResponse
}

const STATUS_MESSAGES: Record<number, string> = {
  400: 'Məlumatlar düzgün deyil',
  403: 'Bu əməliyyat üçün icazəniz yoxdur',
  404: 'Tapılmadı',
  409: 'Bu məlumat artıq mövcuddur',
  422: 'Məlumatlar düzgün deyil',
  500: 'Server xətası baş verdi',
  // Server söndürülüb / əlçatmazdır (proxy və ya hosting səviyyəsində) — şəbəkə xətası ilə eyni mesaj
  502: 'Serverə qoşulmaq mümkün olmadı',
  503: 'Serverə qoşulmaq mümkün olmadı',
  504: 'Serverə qoşulmaq mümkün olmadı',
}

// Backend mesajları ingiliscə gəlir — onları göstərmək əvəzinə status koduna
// görə Azərbaycan dilində sabit mesajlar veririk ki, bütün toastlar eyni dildə olsun
function getErrorMessage(error: AxiosError, isLogin?: boolean): string {
  if (!error.response) return 'Serverə qoşulmaq mümkün olmadı'
  if (error.response.status === 401) {
    return isLogin ? 'Telefon və ya parol yanlışdır' : 'Sessiya bitib, yenidən daxil olun'
  }
  // Backend, sifarişlərdə istifadə olunan məhsulun silinməsini 400/422 ilə rədd edir
  // (foreign key qaydası) — bu halı ümumi "Məlumatlar düzgün deyil" mesajından ayırırıq,
  // yoxsa admin bunu bug kimi qəbul edir.
  const isProductDelete = error.config?.method === 'delete' && /\/admin\/products\//.test(error.config?.url ?? '')
  if (isProductDelete && [400, 422].includes(error.response.status)) {
    return 'Bu məhsul mövcud sifarişlərdə istifadə olunduğu üçün silinə bilməz'
  }
  // Eyni FK qaydası kateqoriyalar üçün də tətbiq olunur — kateqoriyaya bağlı
  // məhsullar mövcuddursa, backend silməyə icazə vermir.
  const isCategoryDelete = error.config?.method === 'delete' && /\/admin\/categories\//.test(error.config?.url ?? '')
  if (isCategoryDelete && [400, 422].includes(error.response.status)) {
    return 'Bu kateqoriya mövcud məhsullarda istifadə olunduğu üçün silinə bilməz'
  }
  return STATUS_MESSAGES[error.response.status] || 'Xəta baş verdi'
}

// Sessiya bitəndə eyni anda bir neçə sorğu (məs. Orders-in `orders`/`orderStats`
// query-ləri) paralel 401 alır — hər biri öz reject-ini atır və queryClient-in
// qlobal onError-u hər reject üçün toast göstərir, nəticədə "Sessiya bitib" iki
// dəfə görünür. Bu flag bir sessiya-bitmə hadisəsində yalnız BİRİNCİ reject-ə
// real mesaj verir, qalanları boş mesajla reject olunur (queryClient boş
// mesajı toast etmir) — flag növbəti uğurlu login-də sıfırlanır.
let sessionExpiryNotified = false

export function resetSessionExpiryNotice(): void {
  sessionExpiryNotified = false
}

let refreshPromise: Promise<AuthTokens> | null = null

function refreshAccessToken(): Promise<AuthTokens> {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(`${BASE_URL}/auth/refresh`, { refresh_token: getRefreshToken() }, { headers: { 'Accept-Language': 'az' } })
      .then((res) => {
        const tokens = res.data.data as AuthTokens
        saveTokens(tokens)
        return tokens
      })
      .finally(() => {
        refreshPromise = null
      })
  }
  return refreshPromise
}

const handleError = async (error: AxiosError) => {
  const original = error.config as InternalAxiosRequestConfig
  const isUnauthorized = error.response?.status === 401
  const canRetry = isUnauthorized && !original.skipAuthRetry && !original._retry && getRefreshToken()

  if (canRetry) {
    original._retry = true
    try {
      await refreshAccessToken()
      return api(original)
    } catch {
      const alreadyNotified = sessionExpiryNotified
      sessionExpiryNotified = true
      clearSession()
      useAuthStore.getState().logout()
      return Promise.reject(new Error(alreadyNotified ? '' : getErrorMessage(error, original.skipAuthRetry)))
    }
  } else if (isUnauthorized && !original.skipAuthRetry) {
    const alreadyNotified = sessionExpiryNotified
    sessionExpiryNotified = true
    clearSession()
    useAuthStore.getState().logout()
    return Promise.reject(new Error(alreadyNotified ? '' : getErrorMessage(error, original.skipAuthRetry)))
  }

  return Promise.reject(new Error(getErrorMessage(error, original.skipAuthRetry)))
}

api.interceptors.response.use(handleSuccess, handleError)

export default api as unknown as UnwrappedApi
