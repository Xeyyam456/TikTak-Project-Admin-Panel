import type { Campaign } from './Campaign'

export interface CampaignsTableProps {
  items: Campaign[]
  page: number
  pageSize: number
  loading: boolean
  onView: (item: Campaign) => void
  onEdit: (item: Campaign) => void
  onDelete: (item: Campaign) => void
}
