import Pagination from '@/utils/Pagination'
import type { CategoriesPaginationProps } from '@/types/category'

export default function CategoriesPagination({ page, pageSize, total, onPageChange }: CategoriesPaginationProps) {
  return <Pagination page={page} pageSize={pageSize} total={total} onPageChange={onPageChange} />
}
