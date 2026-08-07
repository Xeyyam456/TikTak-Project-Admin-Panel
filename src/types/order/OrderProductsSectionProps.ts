import type { OrderItem } from './OrderItem'

export interface OrderProductsSectionProps {
  items: OrderItem[]
  freeShipping: boolean
}
