import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { listProducts } from '@/services/productService'
import { listCategories } from '@/services/categoryService'
import { mapProductFromApi } from '@/lib/adapters/product'
import { mapCategoryFromApi } from '@/lib/adapters/category'
import { usePagination } from '@/shared/hooks/usePagination'

export function useProductsData(search: string) {
  const { data: products = [], isLoading: loading } = useQuery({
    queryKey: ['products'],
    queryFn: () => listProducts().then((data) => data.map(mapProductFromApi)),
  })
  // same queryKey AND same mapping as Categories page — must match exactly, since
  // TanStack Query dedupes by key alone; a mismatched shape here would render broken
  // thumbnails/dates on whichever page mounts second within the cache's staleTime
  const { data: categoryOptions = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => listCategories().then((data) => data.map(mapCategoryFromApi)),
  })

  // Son yaradılan (ən böyük id) ən başda görünsün deyə — backend siyahını
  // yaradılma sırası ilə (köhnədən yeniyə) qaytarır.
  const filtered = useMemo(
    () =>
      products
        .filter((p) =>
          `${p.name} ${p.description} ${p.category?.name ?? ''}`.toLocaleLowerCase('az').includes(search.toLocaleLowerCase('az')),
        )
        .sort((a, b) => b.id - a.id),
    [products, search],
  )

  // 7, not usePagination's own default of 5 — 5 rows left visible dead space
  // below the table before Pagination, since the page chrome comfortably
  // fits 7 rows at typical viewport heights.
  const { page, setPage, pageSize, paged } = usePagination(filtered, 7)

  return { loading, filtered, page, setPage, pageSize, paged, categoryOptions }
}
