import Pagination from '@/utils/Pagination'
import type { ProductsPaginationProps } from '@/types/product'

export default function ProductsPagination({ page, pageSize, total, onPageChange }: ProductsPaginationProps) {
  return <Pagination page={page} pageSize={pageSize} total={total} onPageChange={onPageChange} />
}
