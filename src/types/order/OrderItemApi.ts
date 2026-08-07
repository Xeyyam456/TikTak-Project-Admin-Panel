import type { OrderItemProductApi } from './OrderItemProductApi'

export interface OrderItemApi {
  id: number
  quantity: number
  total_price: string
  product?: OrderItemProductApi
}
