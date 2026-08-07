import type { ProductType } from '@/lib/constants/productTypes'
import type { ProductCategoryShort } from './ProductCategoryShort'

export interface Product {
  id: number
  image: string
  color: string
  imageUrl: string
  name: string
  description: string
  price: string
  type: ProductType
  category: ProductCategoryShort | null
  category_id: number | ''
  date: string
}
