import { Eye } from 'lucide-react'
import Badge from '@/shared/components/Badge'
import Button from '@/shared/components/Button'
import { ORDER_STATUS_LABELS, ORDER_STATUS_BADGE_COLOR } from '@/lib/constants/orderStatus'
import type { Order } from '@/types/order'
import styles from '@/pages/Protected/Orders/styles/OrdersTable.module.css'

export const countCell = (order: Order) => <span className="flex justify-center">{order.itemCount}</span>

export const subtotalCell = (order: Order) => (
  <>
    {order.subtotal} ₼{' '}
    <span className={styles.subtotalNote}>· {order.freeShipping ? 'Pulsuz' : 'Ödənişli'}</span>
  </>
)

export const statusCell = (order: Order) => (
  <Badge color={ORDER_STATUS_BADGE_COLOR[order.status]}>{ORDER_STATUS_LABELS[order.status] ?? order.status}</Badge>
)

export const actionCell = (order: Order, onView: (id: number) => void) => (
  <Button variant="ghost" icon={Eye} iconSize={15} onClick={() => onView(order.id)}>
    Göstər
  </Button>
)
