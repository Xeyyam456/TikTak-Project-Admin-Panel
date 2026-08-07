import type { CategoryApi } from './CategoryApi'

export type CategoryPayload = Pick<CategoryApi, 'name' | 'description' | 'img_url'>
