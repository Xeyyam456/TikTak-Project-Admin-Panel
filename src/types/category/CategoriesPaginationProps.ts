export interface CategoriesPaginationProps {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
}
