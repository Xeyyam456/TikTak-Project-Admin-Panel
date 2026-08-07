import { ShoppingBag } from 'lucide-react'
import type { OrderProductsSectionProps } from '@/types/order'
import OrderProductRow from './OrderProductRow'
import styles from '../styles/OrderDetails.module.css'

export default function OrderProductsSection({ items, freeShipping }: OrderProductsSectionProps) {
  return (
    <div className={styles.productsSection}>
      <h4 className={`flex items-center gap-2 ${styles.detailSectionTitle}`}>
        <ShoppingBag size={15} />
        Məhsullar ({items.length})
      </h4>
      <div className={styles.productsCard}>
        {items.map((item, idx) => (
          <OrderProductRow key={idx} item={item} index={idx} />
        ))}
      </div>
      <div className={styles.shippingNote}>Çatdırılma: {freeShipping ? 'Pulsuz' : 'Ödənişli'}</div>
    </div>
  )
}
