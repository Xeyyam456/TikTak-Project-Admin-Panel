import type { User } from './User'

export interface UsersTableProps {
  items: User[]
  page: number
  pageSize: number
  loading: boolean
  onView: (item: User) => void
}
