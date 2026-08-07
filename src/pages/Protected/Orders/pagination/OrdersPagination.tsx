import Pagination from '@/utils/Pagination'
import type { PaginationProps } from '@/types/shared'

// Orders is the only page with a page-size selector, so its wrapper needs the
// full PaginationProps shape (incl. onPageSizeChange) — reused directly from
// types/shared instead of redeclaring an identical OrdersPaginationProps.
export default function OrdersPagination({ page, pageSize, total, onPageChange, onPageSizeChange }: PaginationProps) {
  return <Pagination page={page} pageSize={pageSize} total={total} onPageChange={onPageChange} onPageSizeChange={onPageSizeChange} />
}
