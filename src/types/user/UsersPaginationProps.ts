export interface UsersPaginationProps {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
}
