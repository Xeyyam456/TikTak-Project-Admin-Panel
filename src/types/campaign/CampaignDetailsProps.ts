import type { Campaign } from './Campaign'

export interface CampaignDetailsProps {
  campaign: Campaign | null
  onClose: () => void
}
