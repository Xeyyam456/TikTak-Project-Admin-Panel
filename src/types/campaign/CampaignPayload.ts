import type { CampaignApi } from './CampaignApi'

export type CampaignPayload = Pick<CampaignApi, 'title' | 'description' | 'img_url'>
