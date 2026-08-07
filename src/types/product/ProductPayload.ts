import type { ProductType } from '@/lib/constants/productTypes'

export interface ProductPayload {
  title: string
  description: string
  price: string
  type: ProductType
  img_url: string
  category_id: number
}
