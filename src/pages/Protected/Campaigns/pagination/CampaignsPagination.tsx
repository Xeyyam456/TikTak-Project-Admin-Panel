import Pagination from '@/utils/Pagination'
import type { CampaignsPaginationProps } from '@/types/campaign'

export default function CampaignsPagination({ page, pageSize, total, onPageChange }: CampaignsPaginationProps) {
  return <Pagination page={page} pageSize={pageSize} total={total} onPageChange={onPageChange} />
}
