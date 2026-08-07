import { AlignLeft, Calendar, Layers, Wallet } from 'lucide-react'
import Modal from '@/shared/components/Modal'
import Thumbnail from '@/shared/components/Thumbnail'
import Badge from '@/shared/components/Badge'
import { PRODUCT_TYPE_LABELS, productTypeBadgeColor } from '@/lib/constants/productTypes'
import type { ProductDetailsProps } from '@/types/product'
import styles from '@/pages/Protected/Products/styles/ProductDetails.module.css'

export default function ProductDetails({ product, onClose }: ProductDetailsProps) {
  return (
    <Modal open={!!product} onClose={onClose} title="Məhsul məlumatları" wide>
      {product && (
        <div>
          <div className={`flex items-center gap-3 ${styles.hero}`}>
            <span className={styles.thumbRing}>
              <Thumbnail imageUrl={product.imageUrl} image={product.image} color={product.color} size="lg" />
            </span>
            <div>
              <div className={styles.detailName}>{product.name}</div>
              <Badge color={productTypeBadgeColor(product.type)}>{PRODUCT_TYPE_LABELS[product.type] ?? product.type}</Badge>
            </div>
          </div>

          <div className={`flex flex-col gap-2 ${styles.detailList}`}>
            <div className={`flex items-center gap-3 ${styles.detailRow}`}>
              <span className={`flex items-center justify-center ${styles.detailIcon} ${styles.iconBlue}`}>
                <AlignLeft size={15} />
              </span>
              <div className="min-w-0">
                <div className={styles.detailLabel}>Açıqlama</div>
                <div className={styles.detailValue}>{product.description}</div>
              </div>
            </div>
            <div className={`flex items-center gap-3 ${styles.detailRow}`}>
              <span className={`flex items-center justify-center ${styles.detailIcon} ${styles.iconAmber}`}>
                <Wallet size={15} />
              </span>
              <div className="min-w-0">
                <div className={styles.detailLabel}>Qiymət</div>
                <div className={styles.detailValue}>{product.price} ₼</div>
              </div>
            </div>
            <div className={`flex items-center gap-3 ${styles.detailRow}`}>
              <span className={`flex items-center justify-center ${styles.detailIcon} ${styles.iconPurple}`}>
                <Layers size={15} />
              </span>
              <div className="min-w-0">
                <div className={styles.detailLabel}>Kateqoriya</div>
                <div className={styles.detailValue}>{product.category?.name ?? ''}</div>
              </div>
            </div>
            <div className={`flex items-center gap-3 ${styles.detailRow}`}>
              <span className={`flex items-center justify-center ${styles.detailIcon} ${styles.iconGreen}`}>
                <Calendar size={15} />
              </span>
              <div className="min-w-0">
                <div className={styles.detailLabel}>Tarix</div>
                <div className={styles.detailValue}>{product.date}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}
