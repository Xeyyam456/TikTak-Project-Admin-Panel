import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query'
import { toast } from 'sonner'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 15_000 },  // 15 saniye  keslenme
  },
  // Boş mesaj = axiosInstance-ın sessiya-bitmə hadisəsini artıq bir dəfə
  // toast etdiyini bildirir (paralel sorğuların hər biri ayrıca reject atır) —
  // həmin təkrarları burada susdururuq
  queryCache: new QueryCache({
    onError: (err) => { if (err.message) toast.error(err.message) },
  }),
  mutationCache: new MutationCache({
    onError: (err) => { if (err.message) toast.error(err.message) },
  }),
})
