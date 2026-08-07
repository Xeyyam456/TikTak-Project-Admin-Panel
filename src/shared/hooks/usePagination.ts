import { useEffect, useState } from 'react'

export function usePagination<T>(items: T[], initialPageSize = 5) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSizeState] = useState(initialPageSize)

  const setPageSize = (size: number) => {
    setPageSizeState(size)
    setPage(1)
  }

  // A search/filter can shrink `items` while `page` is still pointing past
  // the end (e.g. you were on page 3, the filtered list now only fills 1) —
  // without clamping, `paged` slices out-of-range and renders empty even
  // though matches exist on an earlier page.
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const safePage = Math.min(page, totalPages)

  useEffect(() => {
    if (page !== safePage) setPage(safePage)
  }, [page, safePage])

  const paged = items.slice((safePage - 1) * pageSize, safePage * pageSize)

  return { page: safePage, setPage, pageSize, setPageSize, paged }
}
