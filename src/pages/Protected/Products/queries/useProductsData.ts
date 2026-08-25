import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { listProducts } from '@/services/productService'
import { listCategories } from '@/services/categoryService'
import { mapProductFromApi } from '@/lib/adapters/product'
import { mapCategoryFromApi } from '@/lib/adapters/category'

// 7, not usePagination's own default of 5 — 5 rows left visible dead space
// below the table before Pagination, since the page chrome comfortably
// fits 7 rows at typical viewport heights.
const DEFAULT_PAGE_SIZE = 7

// Products is the only resource whose backend list endpoint actually honors
// `limit`/`page`/`search` server-side (confirmed against the real API —
// Categories/Campaigns/Users/Orders all ignore those params and return their
// full list regardless), so pagination/search here goes out as query params
// instead of the client-side usePagination() every other CRUD page still uses.
// `page`/`limit` are kept in the URL's own query string (via useSearchParams,
// not local useState) so the current page is visible/shareable/bookmarkable
// and survives a refresh, rather than only living in React state.
export function useProductsData(search: string) {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const pageSize = Number(searchParams.get('limit')) || DEFAULT_PAGE_SIZE

  const setPage = (nextPage: number) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.set('page', String(nextPage))
        next.set('limit', String(pageSize))
        return next
      },
      { replace: true },
    )
  }

  // Bir dəfə, mount olanda: limit URL-də görünsün, page yoxdursa 1 qoyulsun —
  // istifadəçi səhifəni ilk açanda belə query string boş qalmasın.
  useEffect(() => {
    if (!searchParams.get('page') || !searchParams.get('limit')) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          if (!next.get('page')) next.set('page', '1')
          if (!next.get('limit')) next.set('limit', String(DEFAULT_PAGE_SIZE))
          return next
        },
        { replace: true },
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Axtarış dəyişəndə səhifəni 1-ə qaytarırıq — server-side pagination-da
  // usePagination-un öz clamp-i yoxdur, bunu özümüz idarə edirik. `isFirstRun`
  // effekti mount-da da işə salmasın deyə lazımdır — yoxsa URL-dən gələn
  // ?page=2 kimi bir dəyər hər səhifə açılışında elə həmin an 1-ə sıfırlanardı
  // (bu, refresh-də real olaraq baş vermiş bug idi).
  const isFirstSearchRun = useRef(true)
  useEffect(() => {
    if (isFirstSearchRun.current) {
      isFirstSearchRun.current = false
      return
    }
    setPage(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const { data, isLoading: loading } = useQuery({
    queryKey: ['products', { page, pageSize, search }],
    queryFn: () =>
      listProducts({ page, limit: pageSize, search: search || undefined }).then((res) => ({
        items: res.data.map(mapProductFromApi),
        total: res.pagination.total,
      })),
  })

  // same queryKey AND same mapping as Categories page — must match exactly, since
  // TanStack Query dedupes by key alone; a mismatched shape here would render broken
  // thumbnails/dates on whichever page mounts second within the cache's staleTime
  const { data: categoryOptions = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => listCategories().then((data) => data.map(mapCategoryFromApi)),
  })

  return {
    loading,
    paged: data?.items ?? [],
    total: data?.total ?? 0,
    page,
    setPage,
    pageSize,
    categoryOptions,
  }
}
