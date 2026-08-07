import type { Campaign } from './Campaign'
import type { CampaignForm as CampaignFormValues } from './CampaignForm'

export interface CampaignFormProps {
  open: boolean
  onClose: () => void
  editing: Campaign | null
  defaultValues: CampaignFormValues
  submitting: boolean
  onSubmit: (form: CampaignFormValues) => void
}
