import Pagination from '@/utils/Pagination'
import type { UsersPaginationProps } from '@/types/user'

export default function UsersPagination({ page, pageSize, total, onPageChange }: UsersPaginationProps) {
  return <Pagination page={page} pageSize={pageSize} total={total} onPageChange={onPageChange} />
}
