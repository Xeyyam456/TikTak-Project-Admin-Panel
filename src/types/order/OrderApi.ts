import type { OrderStatus } from '@/lib/constants/orderStatus'
import type { OrderUserShort } from './OrderUserShort'
import type { OrderItemApi } from './OrderItemApi'

export interface OrderApi {
  id: number
  orderNumber: string
  total: string
  deliveryFee: string
  paymentMethod: string
  status: OrderStatus
  note: string
  address: string
  phone: string
  createdAt: string
  updatedAt: string
  // present on the list response, absent on the status-update response — see
  // Orders.jsx's comment on why `selected` is derived from the `orders` cache
  user?: OrderUserShort | null
  items?: OrderItemApi[]
}
