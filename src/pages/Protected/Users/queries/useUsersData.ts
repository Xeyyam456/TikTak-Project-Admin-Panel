import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { listUsers } from '@/services/userService'
import { mapUserFromApi } from '@/lib/adapters/user'
import { usePagination } from '@/shared/hooks/usePagination'

export function useUsersData(search: string) {
  const { data: users = [], isLoading: loading } = useQuery({
    queryKey: ['users'],
    queryFn: () => listUsers().then((data) => data.map(mapUserFromApi)),
  })

  const filtered = useMemo(
    () => users.filter((u) => `${u.name} ${u.phone}`.toLocaleLowerCase('az').includes(search.toLocaleLowerCase('az'))),
    [users, search],
  )

  // 7, not usePagination's own default of 5 — 5 rows left visible dead space
  // below the table before Pagination, since the page chrome comfortably
  // fits 7 rows at typical viewport heights.
  const { page, setPage, pageSize, paged } = usePagination(filtered, 7)

  return { loading, filtered, page, setPage, pageSize, paged }
}
