export interface ProductsPaginationProps {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
}
