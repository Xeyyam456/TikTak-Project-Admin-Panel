import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { listCategories } from '@/services/categoryService'
import { mapCategoryFromApi } from '@/lib/adapters/category'
import { usePagination } from '@/shared/hooks/usePagination'

export function useCategoriesData(search: string) {
  const { data: categories = [], isLoading: loading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => listCategories().then((data) => data.map(mapCategoryFromApi)),
  })

  const filtered = useMemo(
    () =>
      categories.filter((c) =>
        `${c.name} ${c.description}`.toLocaleLowerCase('az').includes(search.toLocaleLowerCase('az')),
      ),
    [categories, search],
  )

  // 7, not usePagination's own default of 5 — 5 rows left visible dead space
  // below the table before Pagination, since the page chrome comfortably
  // fits 7 rows at typical viewport heights.
  const { page, setPage, pageSize, paged } = usePagination(filtered, 7)

  return { loading, filtered, page, setPage, pageSize, paged }
}
