import { ORDER_STATUS_LABELS, ORDER_STATUS_BADGE_COLOR, ORDER_STATUS_OPTIONS } from '@/lib/constants/orderStatus'
import { STATUS_TEXT_COLOR } from '@/pages/Protected/Orders/constants'
import type { OrderStatus } from '@/lib/constants/orderStatus'
import type { OrderStatusSelectProps } from '@/types/order'
import FormDropdown from '@/shared/components/FormDropdown'
import styles from '@/pages/Protected/Orders/styles/OrderDetails.module.css'

const STATUS_DROPDOWN_OPTIONS = ORDER_STATUS_OPTIONS.map((s) => ({ value: s, label: ORDER_STATUS_LABELS[s] }))

export default function OrderStatusSelect({ orderId, status, onStatusChange }: OrderStatusSelectProps) {
  return (
    <div className={styles.statusDropdown} style={{ color: STATUS_TEXT_COLOR[ORDER_STATUS_BADGE_COLOR[status]] }}>
      <FormDropdown
        value={status}
        onChange={(value) => onStatusChange(orderId, value as OrderStatus)}
        options={STATUS_DROPDOWN_OPTIONS}
      />
    </div>
  )
}
