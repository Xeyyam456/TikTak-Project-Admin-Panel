import type { Order } from './Order'
import type { OrderStatus } from '@/lib/constants/orderStatus'

export interface OrderHeroProps {
  order: Order
  onStatusChange: (id: number, status: OrderStatus) => void
}
