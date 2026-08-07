import type { OrderInfoRowProps } from '@/types/order'
import styles from '../styles/OrderDetails.module.css'

export default function OrderInfoRow({ icon: Icon, color, label, value }: OrderInfoRowProps) {
  return (
    <div className={`flex items-center gap-3 ${styles.detailRow}`} data-color={color}>
      <span className={`flex items-center justify-center ${styles.detailIcon}`}>
        <Icon size={15} />
      </span>
      <div className="min-w-0">
        <div className={styles.detailLabel}>{label}</div>
        <div className={styles.detailValue}>{value}</div>
      </div>
    </div>
  )
}
