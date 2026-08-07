import type { ProductType } from '@/lib/constants/productTypes'
import type { ProductCategoryShort } from './ProductCategoryShort'

export interface ProductApi {
  id: number
  title: string
  description: string
  price: string
  type: ProductType
  img_url: string
  category: ProductCategoryShort | null
  created_at: string
}
