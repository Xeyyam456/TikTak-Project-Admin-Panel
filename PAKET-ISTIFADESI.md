# Paket İstifadəsi — Layihədəki Hər Paket Haradadır, Niyə Seçilib

Bu sənəd `package.json`-dakı **hər bir** paketi tək-tək gəzir: konkret olaraq hansı fayllarda istifadə olunur, layihədə hansı problemi həll edir, VƏ (ən vacibi) niyə məhz bu paket seçilib, ən çox bilinən alternativlər (Formik, Redux, Context API, hazır UI kitləri və s.) ƏVƏZİNƏ. Versiyalar `package.json`-da olduğu kimi göstərilir, amma bu sənəd versiyaya deyil, **seçim məntiqinə** fokuslanır.

`CLAUDE.md`/`KOD-IZAHI.md`-dən fərqli olaraq, bu sənəd "necə işləyir" (kod səviyyəsi) yox, "niyə məhz bu alət" (arxitektura qərarı səviyyəsi) sualına cavab verir — kod detalları üçün həmin iki sənədə keçid veriləcək.

---

## 1. Runtime asılılıqları (`dependencies`)

### `react` + `react-dom` (^19.2.7)

**Harada**: Hər yerdə — bütün `.tsx` faylların təməli. `src/app/main.tsx`-də `createRoot(...).render(...)` ilə DOM-a bağlanır.

**Niyə React 19, `<StrictMode>` isə YOX**: `CLAUDE.md`-də qeyd olunub — `<StrictMode>` bilərəkdən çıxarılıb (adətən development-də effektləri iki dəfə işə salıb "təmizlənməyən effect" bug-larını erkən tapmaq üçün istifadə olunur, amma bu layihədə bilərəkdən istifadə edilmir). Alternativ (Vue, Svelte, Angular) müzakirə olunmayıb — komanda artıq React ekosisteminə uyğun seçilmiş digər bütün paketlərlə (TanStack, react-hook-form, react-router) işləyir, React "defolt" seçimdir.

### `react-router-dom` (^7.18.1)

**Harada**: `src/routes/AppRoutes.tsx` (bütün marşrut ağacı), `RequireAuth`/`RedirectIfAuth` (route guard-lar), hər `Protected` səhifədə `useOutletContext<LayoutOutletContext>()` (axtarış mətnini `AdminLayout`-dan aşağı ötürmək üçün, prop-drilling əvəzinə), və İNDİ (bu söhbətdə edilən son dəyişiklik) `Products/queries/useProductsData.ts`-də `useSearchParams()` — səhifələmə (`page`/`limit`) vəziyyətini React state-də deyil, birbaşa URL-in özündə saxlamaq üçün.

**Niyə `useSearchParams`, sadə `useState` ƏVƏZİNƏ (Products-un pagination-u üçün)**: `useState` ilə saxlanan `page` dəyəri, səhifə yenilənəndə (F5) itər, linki kopyalayıb paylaşsan alan şəxs eyni səhifəni görməz. `useSearchParams` dəyəri birbaşa ünvan çubuğunda saxladığı üçün bu iki problem avtomatik həll olunur — əlavə bir "URL sync" kitabxanasına (məs. `use-query-params`) ehtiyac qalmır, çünki react-router-dom bunu artıq daxili verir.

**Niyə React Router, TanStack Router və ya `wouter` ƏVƏZİNƏ**: Layihə köhnədən (TypeScript miqrasiyasından əvvəl də) React Router üzərində qurulub — dəyişdirmək üçün əsaslı bir səbəb (performans problemi, tip təhlükəsizliyi problemi) qeydə alınmayıb, "artıq işləyəni dəyişmə" prinsipi tətbiq olunub.

### `@tanstack/react-query` (^5.101.2)

**Harada**: `src/lib/queryClient.ts` (mərkəzi `QueryClient` + qlobal `onError` toast-ları), bütün 5 səhifənin `queries/use<Name>sData.ts` faylları (`useQuery`), bütün mutasiya faylları (`useMutation` — yaratma/redaktə/silmə/status-dəyişmə).

**Niyə TanStack Query, sadə `useEffect` + `useState` + `fetch` ƏVƏZİNƏ**:
- **Keşləmə (caching)**: eyni `queryKey`-ə (`['categories']` kimi) sahib iki sorğu (məs. `Products` səhifəsinin kateqoriya dropdown-u VƏ `Categories` səhifəsinin öz siyahısı) avtomatik BİR DƏFƏ çəkilib paylaşılır — əl ilə "əgər artıq çəkilibsə, təkrar çəkmə" məntiqi yazmaq lazım gəlmir.
- **`staleTime: 15000`**: 15 saniyə ərzində eyni səhifəyə qayıdanda "köhnəlmiş" sayılmır, təkrar sorğu getmir — sadə `useEffect`-lə bunu düzgün etmək (əvvəlki sorğunun vaxtını yaddaşda saxlamaq, müqayisə etmək) əl ilə yazılsaydı, çoxlu "edge case" bug-a yer açardı.
- **`invalidateQueries`**: bir mutasiya uğurlu olanda, sadəcə `queryKey`-i "köhnəlmiş elan et" demək kifayətdir — TanStack Query özü arxa planda yenidən çəkir. Bunun əvəzinə əl ilə state idarəsi (`setCategories([...categories, newCategory])` kimi) yazılsaydı, HƏR mutasiya üçün siyahını necə "düzgün" yeniləməyin öz məntiqini yazmaq lazım gələrdi (məs. silinən elementi tapıb çıxarmaq, yenilənəni tapıb əvəz etmək) — bu, həm daha çox kod, həm də server-in HƏQİQƏTƏN NƏ qaytardığından (məs. backend-in tətbiq etdiyi əlavə bir sıralama qaydası) sapma riski daşıyır.
- **Optimistic update** (`Orders`-in status dəyişməsi): `onMutate` ilə keşi DƏRHAL yeniləyib, sorğu uğursuz olarsa geri qaytarmaq (`rollback`) — bu, TanStack Query-nin hazır dəstəklədiyi bir naxışdır, əl ilə yazmaq mümkün olsa da, xeyli defansiv kod (əvvəlki dəyəri yadda saxla, xəta olsa geri qaytar, uğurlu olsa təsdiqlə) tələb edərdi.
- **Qlobal xəta idarəsi**: `QueryCache`/`MutationCache`-in `onError`-u sayəsində, HEÇ BİR səhifə öz xəta-toast kodunu yazmır — mərkəzi bir yerdə (`queryClient.ts`) həll olunur (`CLAUDE.md`-də **Error handling** bölməsinə baxın).
- **Nə üçün Redux Toolkit Query (RTK Query) YOX**: RTK Query oxşar imkanlar (keşləmə, invalidasiya) versə də, özü ilə bütün Redux ekosistemini (store, slice, Provider) gətirir — bu layihədə "server state" (backend-dən gələn data) ilə "client state" (formOpen, editing kimi UI vəziyyəti) TAM ayrılıb: server state TanStack Query-də, kiçik qlobal client state isə Zustand-da (aşağıya bax) — Redux-un TAM store/slice/reducer arxitekturasına ehtiyac yaranmayıb, çünki client-side state-in özü kifayət qədər kiçikdir (2 store, hər biri bir neçə sahə).

### `@tanstack/react-table` (^8.21.3)

**Harada**: YALNIZ `Orders` səhifəsində (`table/hooks/useOrdersTable.tsx`, `useOrderColumnDefs.tsx`) — sıralama (sort), 4 filtr (status/tarix/say/çatdırılma), qlobal axtarış və sütun tərifləri üçün.

**Niyə YALNIZ Orders-da, digər 4 səhifədə YOX**: `Campaigns`/`Categories`/`Products`/`Users` səhifələrinin siyahı məntiqi sadədir (bir axtarış sahəsi + `id`-ə görə sıralama) — bunun üçün bir `useMemo` + `.filter().sort()` kifayətdir, `@tanstack/react-table`-ın "headless table" mürəkkəbliyini (column def-lər, filter fn-lər, sorting fn-lər) gətirmək artıq ağırlıq olardı. `Orders`-də isə 4 MÜSTƏQİL filtr + sıralama + axtarış EYNİ ANDA aktiv ola bilər — bunu əl ilə (`.filter().filter().filter().sort()` zənciri) yazmaq getdikcə oxunmaz olardı; `@tanstack/react-table` bu kombinasiyanı `columnFilters`/`sorting`/`globalFilter` state-ləri ilə strukturlaşdırılmış şəkildə idarə edir.

**Niyə "headless" (görünüşsüz) versiya, hazır bir cədvəl kitabxanası (məs. AG Grid, MUI DataGrid) YOX**: Layihənin öz `Table` komponenti (CSS Modules + dizayn token-ləri ilə) artıq var idi — AG Grid/MUI DataGrid kimi "hər şey daxil" kitabxanalar öz CSS-lərini, öz görünüşünü gətirər, mövcud dizaynla (rəng token-ləri, dark mode) uzlaşdırmaq üçün əlavə "override" işi tələb edərdi. `@tanstack/react-table` heç bir JSX/CSS render etmir — yalnız MƏNTİQİ (hansı sətir hansı sıra ilə, hansı filtrlə görünəcək) idarə edir, görünüşü tam layihənin öz `Table` komponentinə buraxır.

### `react-hook-form` (^7.84.0)

**Harada**: `Login`-in formu (`useLoginForm.ts`) + 3 CRUD forması (`CampaignForm`, `CategoryForm`, `ProductForm`).

**Niyə react-hook-form, Formik ƏVƏZİNƏ (BİRBAŞA SUAL):**
- **Performans/render sayı**: Formik hər dəyişiklikdə (hər hərf yazılanda) BÜTÜN formu yenidən render edir (`useState`/Context əsaslı), react-hook-form isə **uncontrolled** (idarə olunmayan) inputlarla işləyir — `register('name')` sahəni birbaşa DOM ref-i ilə izləyir, hərf yazılanda formun QALAN hissəsi render OLUNMUR. Kiçik formalarda fərq gözlə görünməz ola bilər, amma `ProductForm` kimi çoxlu sahəli (7+ sahə, o cümlədən `Controller`-lə bağlanan 2 xüsusi dropdown) formalarda bu fərq real performans qazancına çevrilir.
- **Bundle ölçüsü**: react-hook-form, Formik-dən nəzərəçarpacaq dərəcədə kiçikdir (Formik daxilində özünün validasiya/state idarəetmə qatı daha ağırdır).
- **`Controller` ilə "xarici" komponentləri bağlamaq**: Layihədə native `<select>`/`<input>` olmayan, ÖZÜ xüsusi tərtib olunmuş komponentlər var — `FormDropdown` (Radix əsaslı), `DayPicker` (react-day-picker). Bunları Formik-lə bağlamaq üçün əl ilə `field.onChange`/`field.value`ötürmə məntiqi yazmaq lazım gələrdi; react-hook-form-un `<Controller control={control} name="type" render={({ field }) => <FormDropdown value={field.value} onChange={field.onChange} .../>} />` NAXIŞI bunun üçün BİRİNCİ DƏRƏCƏLİ (first-class) dəstəklənir — sənədləşdirilmiş, hazır bir API-dir, "hack" deyil.
- **`handleSubmit(onSubmit, onInvalid)`**: iki callback-li forma — uğurlu submit VƏ validasiya xətası ayrı-ayrı idarə olunur (`Login`-də, boş/space-only sahə üçün `onInvalid` birbaşa `toast.error(...)` çağırır) — bu, layihənin "inline xəta mətni yoxdur, hər şey toast-dır" qaydasına (`CLAUDE.md`-nin **Error handling** bölməsi) tam uyğun gəlir; Formik-in oxşar imkanı olsa da, react-hook-form-da bu daha birbaşa bir API-dir.
- **NƏTİCƏ**: Sualda deyilən "formik niyə seçilməyib, əvəzinə query-nin table-ı istifadə edilib" ifadəsi bir qədər qarışıqdır — `@tanstack/react-table` FORM idarəetməsi ilə əlaqəli DEYİL (o, CƏDVƏL sıralama/filtrləmə üçündür), react-hook-form isə FORM idarəetməsi üçündür, ikisi tamam fərqli problemləri həll edir. Amma sual "niyə Formik yox" formasında oxunsa, cavab yuxarıdakılardır: performans (uncontrolled), bundle ölçüsü, VƏ Radix/react-day-picker kimi xüsusi komponentlərlə inteqrasiyanın rahatlığı.

### `zustand` (^5.0.14)

**Harada**: YALNIZ 2 store — `src/store/useAuthStore.ts` (login/logout/profil/token) və `src/store/useThemeStore.ts` (açıq/qaranlıq rejim).

**Niyə Zustand, Redux (Toolkit) ƏVƏZİNƏ (BİRBAŞA SUAL):**
- **Provider lazım deyil**: Redux-da `<Provider store={store}>` ilə BÜTÜN tətbiqi sarmaq lazımdır; Zustand-da `create<T>()` sadəcə bir hook qaytarır (`useAuthStore()`), heç bir Provider, `App.tsx`-ə əlavə bir sarğı qatı əlavə olunmur.
- **Boilerplate yoxdur**: Redux-da state dəyişikliyi üçün "action type" sabitləri, "action creator" funksiyaları, "reducer" (switch-case) yazmaq lazımdır — Zustand-da store-un ÖZÜ birbaşa `login`/`logout` KİMİ FUNKSİYALARI SAXLAYIR (`create<AuthState>()((set) => ({ isAuthenticated: false, login: (data) => { saveSession(data); set({ isAuthenticated: true, profile: data.profile }) }, ... }))`) — bir state dəyişikliyi üçün 3 fərqli fayl/blok yazmaq əvəzinə, BİR YERDƏ, birbaşa funksiya kimi yazılır.
- **REACT KOMPONENTİ OLMAYAN yerlərdən oxuna/yazıla bilir**: BU, ƏSAS SƏBƏBLƏRDƏN BİRİDİR. `src/services/axiosInstance.ts` (adi bir `.ts` faylı, HEÇ BİR React komponenti DEYİL) sessiya bitəndə `useAuthStore.getState().logout()` ÇAĞIRIR — Zustand-ın `.getState()`/`.setState()` metodları HƏR YERDƏN (Hook olmadan) çağırıla bilir. React-in öz Context API-si isə YALNIZ komponent ağacının İÇİNDƏN (`useContext` hook-u ilə) oxuna bilər — axios-un interceptor-u kimi "React-dən kənar" bir yerdən login state-ini dəyişmək üçün, Context ilə əlavə bir "workaround" (məs. bir React-dən kənar dəyişəndə store referensiyasını saxlamaq) lazım gələrdi, Zustand-da bu, hazır dəstəklənir.
- **Niyə sadəcə React Context/`useState` DEYİL**: 2 store-un HƏR İKİSİ TƏTBİQİN TAM BAŞQA-BAŞQA yerlərindən (route guard-lar, axios interceptor, Header-in tema düyməsi, Sidebar-ın çıxış düyməsi) OXUNUR/YAZILIR — Context ilə bunu etmək üçün `AuthProvider`/`ThemeProvider` yaradıb `App.tsx`-i onlarla sarmaq, VƏ yenə də "React-dən kənar oxuma" problemi üçün ayrı bir həll tapmaq lazım gələrdi. Zustand bu iki problemi (qlobal state + React-dən kənar giriş) BİR KİÇİK PAKETLƏ həll edir.
- **Niyə TAM Redux Toolkit yox, sadə Zustand kifayətdir**: Bu 2 store-un HEÇ BİRİNDƏ mürəkkəb, çox addımlı "state machine" məntiqi yoxdur (sadəcə `isAuthenticated`/`profile`/`theme` kimi bir neçə sahə) — Redux Toolkit-in gətirdiyi middleware, DevTools inteqrasiyası, slice strukturu kimi əlavə imkanlar bu ölçüdə bir state üçün artıq mürəkkəblikdir.

### `axios` (^1.18.1)

**Harada**: `src/services/axiosInstance.ts` (TƏK yaradılan instans) + hər `src/services/*Service.ts` faylı bunun üzərindən `api.get/post/put/delete` çağırır.

**Niyə axios, brauzerin daxili `fetch`-i ƏVƏZİNƏ**:
- **Interceptor-lar**: layihənin TAM auth-axını (`Authorization: Bearer <token>` header-inin HƏR sorğuya avtomatik əlavəsi, 401 alınanda token-i "səssizcə" yeniləyib sorğunu TƏKRARLAMA, zərfin (`{message, data, result}`) avtomatik açılması) MƏHZ axios-un `interceptors.request.use`/`interceptors.response.use` API-sinə söykənir. `fetch` ilə bunun EYNİSİNİ etmək üçün HƏR sorğunu əl ilə bir "wrapper" funksiyaya salmaq lazım gələrdi (əslində, öz-özünə kiçik bir "axios" yenidən yazmaq mənasına gələrdi).
- **Avtomatik JSON**: axios cavabı avtomatik JSON-a çevirir (`response.data`), `fetch` isə `res.json()` ilə əlavə bir addım (VƏ `await`) tələb edir.
- **`AxiosError` tipı**: xəta idarəsi (`getErrorMessage`, status koduna görə mesaj seçimi) `error.response.status` KİMİ strukturlaşdırılmış BİR OBYEKTƏ söykənir — `fetch` XƏTA statusunu (404, 500) `reject` ETMİR (yalnız şəbəkə xətasında reject edir), status yoxlaması ÜÇÜN ƏLAVƏ `if (!res.ok)` MƏNTİQİ hər yerdə TƏKRARLANMALI OLARDI.

### `sonner` (^2.0.7)

**Harada**: `App.tsx`-də BİR DƏFƏ `<Toaster />` render olunur; `toast.success(...)`/`toast.error(...)` ÇAĞIRIŞLARI isə `queryClient.ts` (qlobal xəta), `useLoginForm.ts`, `Sidebar.tsx` (çıxış), VƏ hər mutasiyanın `onSuccess`-i (yaratma/redaktə/silmə uğur mesajları) daxil olmaqla 8 faylda.

**Niyə sonner, `react-toastify`/`react-hot-toast` ƏVƏZİNƏ**: Xüsusi bir sənədləşdirilmiş səbəb qeydə alınmayıb (`react-hot-toast`-a bənzər, kiçik bir API-yə sahibdir) — praktik seçim, ekstra konfiqurasiya olmadan yaxşı defolt animasiya/mövqe (`bottom-right` kimi) verməsi, VƏ TEK, mərkəzi `<Toaster/>` KOMPONENTİ İLƏ İŞLƏMƏSİ (layihənin "toast HƏR ZAMAN qlobal, səhifə özü YOX" qaydasına RAHAT UYĞUNLAŞIR).

### `@radix-ui/react-dropdown-menu` (^2.1.24)

**Harada**: `FormDropdown` (formalardakı "Növ"/"Kateqoriya" seçimləri), `Orders`-in `ColumnHeader` (status/say/çatdırılma sütun filtrləri), `Pagination.tsx` (səhifə ölçüsü seçici, `Orders`-də).

**Niyə Radix, native `<select>` VƏ YA hazır bir UI kiti (MUI, Ant Design) ƏVƏZİNƏ**:
- **Native `<select>`-in problemi**: brauzer öz native dropdown-unu (əməliyyat sistemindən asılı görünüş) göstərir — layihənin özəl dizaynına (rəng, radius, focus halları) UYĞUNLAŞDIRMAQ MÜMKÜN DEYİL (brauzerlər native `<select>`-in açılan menyusunu CSS ilə demək olar ki, stilləşdirməyə İCAZƏ VERMİR).
- **Niyə TAM hazır bir UI kiti (MUI, Ant Design, Chakra) YOX**: Bu kitlər ÖZLƏRİNİN dizayn sistemini (rəng palitri, komponent görünüşü) GƏTİRİR — layihə ARTIQ Figma-dan gələn ÖZ dizaynına (CSS custom property token-ləri, `CLAUDE.md`-nin **Design tokens** bölməsi) sahibdir. Bir UI kiti gətirsəydi, HƏR komponentin görünüşünü override etmək (VƏ bunu HƏM açıq, HƏM qaranlıq rejim üçün) əslində Radix-in verdiyi "sıfırdan öz stilini yaz" yanaşmasından DAHA ÇOX iş olardı.
- **Radix-in verdiyi "pulsuz"**: klaviatura ilə naviqasiya (ox düymələri, Escape), fokus idarəsi, ekran-oxuyucu üçün ARIA atributları, `Portal` ilə DOM-un kənarına render (bir cədvəl sətrinin `overflow`-u dropdown-u KƏSMƏSİN deyə), VƏ `collisionBoundary` ilə "ekranın kənarına çıxanda avtomatik istiqamətini dəyiş" məntiqi — bunların HƏR BİRİNİ əl ilə düzgün yazmaq (xüsusilə ARIA/klaviatura hissəsi) HƏFTƏLƏRLƏ vaxt apara bilər, Radix isə bunu "unstyled" (öz görünüşü olmayan, sırf davranış təmin edən) bir primitiv kimi verir — YALNIZ CSS-i özümüz yazırıq, DAVRANIŞ hazır gəlir.

### `react-day-picker` (^10.0.1)

**Harada**: YALNIZ `Orders`-in "Tarix" filtri (`DateFilterCalendar.tsx`, `React.lazy` ilə YÜKLƏNİR — aşağıya bax).

**Niyə hazır bir təqvim kitabxanası, sıfırdan yazılan bir təqvim CƏDVƏLİ ƏVƏZİNƏ**: Bir təqvim düzgün yazmaq (ay uzunluqları, ilin köçəri illəri, "ayın 1-i hansı gündən başlayır" hesablaması, klaviatura ilə naviqasiya) görünəndən qat-qat çətindir — hazır, geniş test edilmiş bir kitabxana bu riskin qarşısını alır.
**Niyə MƏHZ react-day-picker, `react-datepicker` VƏ YA başqası YOX**: Sənədləşdirilmiş bir müqayisə qeydə alınmayıb, amma seçilmiş versiya CSS custom property-lər (`--rdp-*`) ÜZƏRİNDƏN stilləşdirməyə İCAZƏ VERİR — bu, layihənin ÖZ dizayn-token yanaşması (`--color-green`, `--radius-sm` kimi) ilə TƏBİİ ŞƏKİLDƏ UYĞUNLAŞIR (`CLAUDE.md`-nin `--rdp-*` `!important` qeydinə baxın).
**Niyə `React.lazy` ilə YÜKLƏNİR**: Bu kitabxana, `Orders`-in ÖZ route-chunk-ını (`login`-dən sonra İSTİFADƏÇİNİN İLK GÖRDÜYÜ səhifə) TƏK BAŞINA ~75 KB (56 KB gzip) BÖYÜDÜRDÜ — YALNIZ təqvim popover-i AÇILANDA yüklənməsi, İLK YÜKLƏMƏ ölçüsünü kəskin AZALDIR (`CLAUDE.md`-də ölçülüb: 174 KB → 99 KB).

### `date-fns` (^4.4.0)

**Harada**: YALNIZ `DateFilterCalendar.tsx`-də, `import { az } from 'date-fns/locale'` — `react-day-picker`-in `locale` PROP-una AZ (Azərbaycan) dilində ay/gün adları vermək üçün.

**VACİB**: `date-fns` bu layihənin ÜMUMİ tarix kitabxanası DEYİL — `src/utils/FormatDate/formatDate.ts` (bütün tarix göstərmə yerlərində istifadə olunan funksiya) `date-fns`-dən HEÇ NƏ İDXAL ETMİR, tam native `Date` (`.getDate()`/`.getMonth()`/`.getFullYear()`) İLƏ YAZILIB; `Orders`-in tarix FİLTRİ də (`utils/filters.ts`-dəki `toDateInputValue`/`parseDateInputValue`) native `Date`-lə, "y/m/d komponentlərini əl ilə oxu" YANAŞMASI İLƏ yazılıb (`CLAUDE.md`-də izah olunan UTC parçalama bug-undan qaçmaq üçün). YƏNİ: `date-fns` paketi package.json-da olsa da, bu, `react-day-picker`-in ÖZ asılılığıdır (o, `locale` obyektlərini `date-fns/locale`-dan qəbul edir) — layihə ÖZÜ tarix formatlaşdırması/hesablaması ÜÇÜN bu paketi SEÇMƏYİB, sadəcə react-day-picker-in tələb etdiyi bir "yan girişi" istifadə edir. Əgər `react-day-picker` layihədən çıxarılsaydı, `date-fns`-ə DƏ artıq ehtiyac qalmazdı.

### `lucide-react` (^1.24.0)

**Harada**: HƏR YERDƏ — `Button`-un `icon` PROP-u, `StatCard`-ın ikonları, `Table`-in Sırala/Filtr ikonları, `Sidebar`/`Header`-in naviqasiya ikonları, `ImageUploadField`-in "Yüklə"/"Sil" ikonları VƏ S.

**Niyə lucide-react, `react-icons`, `@heroicons/react`, VƏ YA SVG faylları ƏL İLƏ idxal etmək ƏVƏZİNƏ**: 
- **Tree-shaking**: `import { Plus } from 'lucide-react'` YAZANDA, YALNIZ `Plus` ikonu son bundle-a DÜŞÜR — istifadə OLUNMAYAN YÜZLƏRLƏ digər ikon build-ə daxil olmur (Vite/Rolldown bunu avtomatik təmin edir).
- **Vahid stil**: lucide-un BÜTÜN ikonları EYNİ stroke qalınlığı/üslubu ilə çəkilib — Figma dizaynının özü DƏ bu "stroke-based" (konturlu, dolmamış) ikon üslubuna əsaslanır, İKON dəstlərini QARIŞDIRMAQ (bəzisi lucide, bəzisi başqa bir kit) görünüşdə uyğunsuzluğa səbəb OLARDI.
- **React komponenti kimi**: hər ikon artıq bir React komponentidir (`<Plus size={16} color="..." />`) — xam SVG faylı idxal edib `size`/`color` KİMİ PROP-LARI ƏL İLƏ idarə etməkdən DAHA RAHATDIR.

### `@fontsource/roboto` (^5.2.10)

**Harada**: `src/index.css`-də, YALNIZ `latin`/`latin-ext` alt-dəstləri (300/400/500/700 çəkiləri) idxal olunur.

**Niyə self-hosted (`@fontsource`) paket, Google Fonts CDN LİNKİ (`<link href="fonts.googleapis.com/...">`) ƏVƏZİNƏ**: 
- **Xarici şəbəkə sorğusu YOXDUR**: Google Fonts CDN-i istifadə etsəydi, hər səhifə YÜKLƏMƏSİNDƏ BROWSER ayrı bir domenə (fonts.googleapis.com) DNS/TLS RƏSMİLƏŞMƏSİ APARARDI — `@fontsource` FONT FAYLLARINI birbaşa `node_modules`-a QOYUR, Vite onları ÖZ bundle-ının bir hissəsi kimi (öz domeninizdən) SERVİS EDİR — bir XARİCİ ŞƏBƏKƏ ASILILIĞI daha AZDIR.
- **YALNIZ lazım OLAN alt-dəstlər**: `latin`+`latin-ext` (Azərbaycan hərfləri `ə/ğ/ı/ö/ş/ü/ç` `latin-ext`-dədir) SEÇİLİB, defolt `300.css`/`400.css` KİMİ BAĞLANTILAR isə cyrillic/greek/vietnamese KİMİ LAZIMSIZ ALT-DƏSTLƏRİ DƏ GƏTİRƏRDİ — bu, `CLAUDE.md`-də ÖLÇÜLƏN "TƏXMİNƏN 4 DƏFƏ ARTIQ" font YÜKÜNÜN qarşısını alır.

---

## 2. Development asılılıqları (`devDependencies`)

### `vite` (^8.1.1) + `@vitejs/plugin-react` (^6.0.3)

**Harada**: Bütün build/dev-server PROSESİ (`npm run dev`/`build`/`preview`) VƏ `vite.config.ts`.

**Niyə Vite, Create React App (CRA) VƏ YA Webpack ƏL İLƏ KONFİQURASİYASI ƏVƏZİNƏ**: CRA ARTIQ RƏSMİ OLARAQ DAYANDIRILIB (dead), Webpack-i ƏL İLƏ konfiqurasiya ETMƏK (loader-lar, plugin-lər) XEYLİ DAHA ÇOX BAŞLANĞIC İŞİ TƏLƏB EDƏR. Vite dev-də ES MODULES ÜZƏRİNDƏN İŞLƏYİR (bundle etmədən, brauzerin ÖZÜNƏ modul YÜKLƏTDİRİR) — bu, DEV SERVER-İN BAŞLAMA VƏ hot-reload SÜRƏTİNİ KƏSKİN ARTIRIR. Bu layihədəki KONKRET Vite versiyası (8.x) DAXİLDƏ **Rolldown** (Rust-da yazılmış YENİ bundler) ÜZƏRİNDƏ QURULUB — `CLAUDE.md`-də qeyd olunan `manualChunks`-ın FUNKSİYA formasında YAZILMALI OLMASI SƏBƏBİ MƏHZ BUDUR (klassik Rollup-un obyekt formasını QƏBUL ETMİR).

### `typescript` (^7.0.2)

**Harada**: Bütün `src/` (`.ts`/`.tsx`) — `allowJs: false`, YƏNİ layihədə `.js`/`.jsx` FAYLI QALMAYIB.

**Niyə TypeScript, sadə JavaScript ƏVƏZİNƏ**: `CLAUDE.md`-nin TAM bir bölməsi (**TypeScript**) buna HƏSR OLUNUB — `strict`+`noUncheckedIndexedAccess`+`noImplicitOverride` KİMİ SƏRT AYARLAR, `any` QADAĞASI (oxlint ilə MƏCBURİ EDİLİR). Əsas FAYDA: backend-in cavab FORMASI (`XApi`) İLƏ UI-IN GÖZLƏDİYİ FORMA (`X`) ARASINDAKI FƏRQİ (`mapXFromApi`) TİP SƏVİYYƏSİNDƏ YOXLAMAQ — bu, layihə TARİXÇƏSİNDƏ (`ProductForm.category_id`-in `number | string` OLMASI KİMİ) real BUG-LARI, RUNTIME-A ÇATMADAN, KOMPİLYASİYA ANINDA tutub.

### `tailwindcss` (^4.3.3) + `@tailwindcss/vite` (^4.3.3)

**Harada**: `vite.config.ts`-in `plugins`-i + `src/index.css`-dəki `@import "tailwindcss";` — sonra HƏR YERDƏ, JSX-in `className` STRİNQLƏRİNDƏ (`flex`, `gap-3`, `items-center`, `justify-between`, `truncate`, `cursor-pointer` KİMİ) İSTİFADƏ OLUNUR.

**NİYƏ HƏM Tailwind, HƏM DƏ CSS Modules — İKİSİ BİRDƏN NİYƏ LAZIMDIR**: Bu, layihənin bilərəkdən SEÇDİYİ bir HİBRİD YANAŞMADIR:
- **Tailwind** — TEZ-TEZ TƏKRARLANAN, "TƏK DƏFƏLİK" DÜZÜM (layout) İŞLƏRİ ÜÇÜN (`flex items-center gap-2` YAZMAQ, HƏR DƏFƏSİNDƏ AYRI BİR `.flexRow { display:flex; align-items:center; gap:8px }` KLASI YARADIB `.module.css`-ə ƏLAVƏ ETMƏKDƏN QAT-QAT SÜRƏTLİDİR).
- **CSS Modules (`.module.css`)** — DİZAYN TOKEN-LƏRİNƏ (`var(--color-green)` KİMİ), DARK MODE-A (`:root[data-theme="dark"]`), VƏ MÜRƏKKƏB/TƏKRARLANMAYAN SEÇİCİLƏRƏ (`.detailRow[data-color='blue'] .detailIcon` KİMİ) İHTİYAC OLAN yerlərdə.
- **NİYƏ TAM Tailwind (hər şey Tailwind class-ı) YOX**: dizayn token-lərinin (dark mode DAXİL) idarəsi CSS custom property-lər ÜZƏRİNDƏN qurulub (`CLAUDE.md`-nin **Design tokens**/**Dark mode** bölmələri) — Tailwind-in ÖZ rəng/ölçü SKALASINI (`bg-blue-500` KİMİ) İSTİFADƏ ETSƏYDİ, dark mode ÜÇÜN `dark:` VARIANT-LARINI HƏR YERDƏ TƏKRARLAMAQ LAZIM GƏLƏRDİ — layihənin ÖZ CSS-dəyişən (custom property) sistemi ARTIQ BUNU HƏLL ETDİYİ ÜÇÜN, Tailwind YALNIZ LAYOUT ÜÇÜN saxlanılıb, rəng/tema ÜÇÜN YOX.
- **NİYƏ TAM CSS Modules (heç Tailwind yox) DA YOX**: sadə bir `flex items-center gap-2` ÜÇÜN AYRI BİR CSS klası YARATMAQ (VƏ ONA AD TAPMAQ) LAZIMSIZ BİR ADDIMDIR — bu, KODU OXUMAĞI DA ÇƏTİNLƏŞDİRƏR (JSX-ə BAXANDA "BU ELEMENT FLEX-Dİ" DEYİL, `.module.css` FAYLINA KEÇİB YOXLAMAQ LAZIM GƏLƏR).

### `oxlint` (^1.71.0)

**Harada**: `npm run lint`, `.oxlintrc.json` KONFİQURASİYASI İLƏ — `.ts`/`.tsx` DAXİL OLMAQLA BÜTÜN KOD BAZASINI YOXLAYIR.

**Niyə oxlint, ESLint (+ `typescript-eslint`) ƏVƏZİNƏ**: 
- **Sürət**: oxlint Rust-da YAZILIB — ESLint (JavaScript-də yazılıb, HƏR QAYDA ÜÇÜN AYRI BİR AST GƏZİNTİSİ APARIR) İLƏ MÜQAYİSƏDƏ, BÖYÜK KOD BAZALARINDA ONLARLA DƏFƏ SÜRƏTLİDİR.
- **Sıfır konfiqurasiya YÜKÜ**: `typescript-eslint` QURMAQ ÜÇÜN ADƏTƏN `parser`, `parserOptions.project`, ƏLAVƏ PLUGIN-LƏR (react, react-hooks, import) LAZIMDIR — oxlint-in ÖZÜNÜN DAXİLİ `typescript` PLUGİN-İ BUNLARIN ÇOXUNU "QUTUDAN ÇIXAN KİMİ" (out-of-the-box) DƏSTƏKLƏYİR.
- **`typescript/no-explicit-any: error`**: layihənin "HEÇ BİR `any` YAZILMASIN" QAYDASI (`CLAUDE.md`-nin **`any`/`unknown` policy**) MƏHZ BU PLUGİNLƏ MƏCBURİ EDİLİR — sadəcə bir "TÖVSİYYƏ" DEYİL, `npm run lint` UĞURSUZ OLUR.
- **Nöqsan/məhdudiyyət**: oxlint HƏLƏ ESLint QƏDƏR ZƏNGİN BİR PLUGİN EKOSİSTEMİNƏ (məs. `eslint-plugin-jsx-a11y`-NİN TAM BİR ANALOQU) SAHİB DEYİL — layihə bunun ƏVƏZİNƏ SÜRƏTİ VƏ TypeScript-in ÖZÜNÜN (tsc) AYRICA `npm run typecheck` İLƏ İŞLƏMƏSİNİ ÜSTÜN TUTUB.

### `@types/node`, `@types/react`, `@types/react-dom`

**Harada**: TypeScript-in `node`/`react`/`react-dom` API-LƏRİNİ TANIMASI ÜÇÜN (məs. `vite.config.ts`-də `path.resolve`, `import.meta.dirname` KİMİ Node API-LƏRİ) — RUNTIME-DA HEÇ BİR ROLU YOXDUR, YALNIZ KOMPİLYASİYA VAXTI TİP MƏLUMATI VERİR. Ayrıca izaha ehtiyac yoxdur — bunlar "əsl" paket DEYİL, mövcud paketlərin TİP TƏRİFLƏRİDİR (`react`/`react-dom` ÖZLƏRİ artıq TypeScript-lə YAZILMADIĞI ÜÇÜN, TİPLƏRİ AYRICA `@types/*` PAKETLƏRİNDƏ GƏLİR; `node` da EYNİ SƏBƏBDƏN).

---

## 3. Xülasə cədvəli — "niyə BU, O YOX" sürətli baxış

| Seçilən | Nəzərdən keçirilə bilən alternativ | Əsas səbəb |
|---|---|---|
| **react-hook-form** | Formik | Uncontrolled input-lar → az render; `Controller` ilə Radix/react-day-picker kimi "native olmayan" sahələri asanlıqla bağlamaq |
| **TanStack Query** | Redux Toolkit Query, əl ilə `useEffect`+`fetch` | Server state/client state ayrımı; keşləmə, invalidasiya, optimistic update hazır gəlir, Redux-un tam store/slice mexanizmi olmadan |
| **Zustand** | Redux, React Context | Provider-siz; React komponenti OLMAYAN yerlərdən (axios interceptor) də oxuna/yazıla bilir; 2 kiçik store üçün minimal boilerplate |
| **axios** | fetch | Interceptor-lar (auth header, 401 refresh-retry, zərf açma) hazır API kimi gəlir |
| **@radix-ui/react-dropdown-menu** | native `<select>`, hazır UI kit (MUI/AntD) | Native `<select>` stilləşdirilə bilmir; hazır UI kit öz dizaynını gətirər — Radix "unstyled", yalnız davranış (klaviatura, ARIA, portal, collision) verir |
| **@tanstack/react-table** | əl ilə `.filter()/.sort()` | Yalnız Orders-də — 4 filtr + sıralama + axtarış eyni anda aktiv ola bildiyi üçün struktura ehtiyac var; digər 4 səhifə sadə qaldığı üçün istifadə olunmur |
| **react-day-picker** | əl ilə təqvim, `react-datepicker` | Hazır, test edilmiş tarix hesablamaları; CSS custom property ilə tema uyğunlaşması; `React.lazy` ilə bundle ağırlığından qaçılıb |
| **date-fns** | (seçim deyil, react-day-picker-in asılılığı) | Yalnız `az` locale üçün — layihənin öz tarix formatlaması native `Date` ilədir |
| **sonner** | react-toastify, react-hot-toast | Minimal API, tək qlobal `<Toaster/>` naxışına rahat uyğunlaşma |
| **Tailwind + CSS Modules** | Tam Tailwind, tam CSS Modules | Layout üçün Tailwind (sürət), rəng/tema/dark-mode üçün CSS Modules + custom property token-lər (mərkəzi idarə) |
| **oxlint** | ESLint + typescript-eslint | Sürət (Rust), konfiqurasiya yükünün azlığı, daxili TypeScript dəstəyi |
| **Vite (Rolldown)** | CRA, əl ilə Webpack | Sürətli dev-server, ES modules əsaslı, müasir bundling |
