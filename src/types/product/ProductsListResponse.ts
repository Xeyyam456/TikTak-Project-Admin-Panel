import type { PaginationMeta } from '@/types/common'
import type { ProductApi } from './ProductApi'

export interface ProductsListResponse {
  data: ProductApi[]
  pagination: PaginationMeta
}
