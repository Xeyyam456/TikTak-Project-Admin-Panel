import type { OrderStatus } from '@/lib/constants/orderStatus'
import type { OrderUserShort } from './OrderUserShort'
import type { OrderItem } from './OrderItem'

export interface Order {
  id: number
  orderNumber: string
  date: string
  // raw ISO timestamp, kept alongside the formatted `date` display string
  // specifically so Orders.tsx can sort chronologically — `date` (dd.mm.yyyy)
  // does not sort correctly as a plain string.
  createdAt: string
  address: string
  phone: string
  paymentMethod: 'Kart' | 'Nağd'
  status: OrderStatus
  subtotal: string
  freeShipping: boolean
  itemCount: number
  user: OrderUserShort | null
  items: OrderItem[]
}
