import type { OrderStatus } from '@/lib/constants/orderStatus'

export interface OrderStatusSelectProps {
  orderId: number
  status: OrderStatus
  onStatusChange: (id: number, status: OrderStatus) => void
}
