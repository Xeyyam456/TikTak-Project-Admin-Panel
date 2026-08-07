import type { ProductType } from '@/lib/constants/productTypes'

export interface OrderItemProductApi {
  id: number
  title: string
  img_url: string
  description: string
  price: string
  type: ProductType
  created_at: string
  category: { id: number; name: string } | null
}
