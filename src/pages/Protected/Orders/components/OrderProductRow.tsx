import Thumbnail from '@/shared/components/Thumbnail'
import type { OrderProductRowProps } from '@/types/order'
import styles from '@/pages/Protected/Orders/styles/OrderDetails.module.css'

export default function OrderProductRow({ item, index }: OrderProductRowProps) {
  return (
    <div className={`flex items-center gap-3 ${styles.productRow}`}>
      <span className={`flex items-center justify-center ${styles.productIndex}`}>{index + 1}</span>
      <Thumbnail image={item.image} color={item.color} />
      <div className="flex-1 min-w-0">
        <div className={styles.productName}>{item.name}</div>
        <div className={styles.productMeta}>
          {item.category} · {item.weight}
        </div>
      </div>
      <div className={`flex flex-col items-end gap-1 ${styles.productPriceWrap}`}>
        <span className={styles.pricePill}>{item.price} ₼</span>
        <span className={styles.productUnit}>{item.unit}</span>
      </div>
    </div>
  )
}
