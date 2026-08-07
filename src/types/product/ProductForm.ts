import type { ProductType } from '@/lib/constants/productTypes'

export interface ProductForm {
  image: string
  color: string
  imageUrl: string
  name: string
  description: string
  price: string
  // starts as `number | ''` (openCreate seeds it from a Product's category_id)
  // but a <select>'s onChange always hands back a plain string — widened to
  // cover both origins rather than casting at every call site.
  category_id: number | string
  type: ProductType
}
