import { ORDER_STATUS_LABELS, ORDER_STATUS_BADGE_COLOR, ORDER_STATUS_OPTIONS } from '@/lib/constants/orderStatus'
import type { OrderStatus } from '@/lib/constants/orderStatus'
import type { OrderStatusSelectProps } from '@/types/order'
import { STATUS_TEXT_COLOR } from '@/pages/Protected/Orders/constants'
import styles from '@/pages/Protected/Orders/styles/OrderDetails.module.css'

export default function OrderStatusSelect({ orderId, status, onStatusChange }: OrderStatusSelectProps) {
  return (
    <select
      value={status}
      onChange={(e) => onStatusChange(orderId, e.target.value as OrderStatus)}
      className={styles.statusSelect}
      style={{ color: STATUS_TEXT_COLOR[ORDER_STATUS_BADGE_COLOR[status]] }}
    >
      {ORDER_STATUS_OPTIONS.map((s) => (
        // options don't inherit the select's dynamic status color — without
        // this, every option in the open dropdown list would render in
        // whatever color the currently selected status happens to be
        <option key={s} value={s} className={styles.statusOption}>
          {ORDER_STATUS_LABELS[s]}
        </option>
      ))}
    </select>
  )
}
