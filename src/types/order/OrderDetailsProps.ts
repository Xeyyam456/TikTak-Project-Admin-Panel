import type { Order } from './Order'
import type { OrderStatus } from '@/lib/constants/orderStatus'

export interface OrderDetailsProps {
  order: Order | null
  onClose: () => void
  onStatusChange: (id: number, status: OrderStatus) => void
}
