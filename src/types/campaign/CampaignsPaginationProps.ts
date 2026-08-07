export interface CampaignsPaginationProps {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
}
