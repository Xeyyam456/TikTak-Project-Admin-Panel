import { ORDER_STATUS_BADGE_COLOR } from '@/lib/constants/orderStatus'
import { STATUS_TEXT_COLOR } from '@/pages/Protected/Orders/constants'
import type { OrderHeroProps } from '@/types/order'
import OrderStatusSelect from './OrderStatusSelect'
import styles from '../styles/OrderDetails.module.css'

export default function OrderHero({ order, onStatusChange }: OrderHeroProps) {
  return (
    <div className={`flex items-center justify-between flex-wrap gap-3 ${styles.hero}`}>
      <div className="flex items-center gap-3">
        <span
          className={`flex items-center justify-center ${styles.statusDot}`}
          style={{ background: STATUS_TEXT_COLOR[ORDER_STATUS_BADGE_COLOR[order.status]] }}
        >
          {order.status === 'DELIVERED' ? '✓' : '0'}
        </span>
        <span className={styles.orderCode}>{order.orderNumber}</span>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <div className={styles.miniLabel}>Status</div>
          <OrderStatusSelect orderId={order.id} status={order.status} onStatusChange={onStatusChange} />
        </div>
        <div>
          <div className={styles.miniLabel}>Ümumi məbləğ</div>
          <div className={`text-right ${styles.amountText}`}>{order.subtotal} ₼</div>
        </div>
      </div>
    </div>
  )
}
