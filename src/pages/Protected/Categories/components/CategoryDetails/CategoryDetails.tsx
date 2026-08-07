import { AlignLeft, Calendar } from 'lucide-react'
import Modal from '@/shared/components/Modal'
import Thumbnail from '@/shared/components/Thumbnail'
import type { CategoryDetailsProps } from '@/types/category'
import styles from '@/pages/Protected/Categories/styles/CategoryDetails.module.css'

export default function CategoryDetails({ category, onClose }: CategoryDetailsProps) {
  return (
    <Modal open={!!category} onClose={onClose} title="Kateqoriya məlumatları" wide>
      {category && (
        <div>
          <div className={`flex items-center gap-3 ${styles.hero}`}>
            <span className={styles.thumbRing}>
              <Thumbnail imageUrl={category.imageUrl} image={category.image} color={category.color} size="lg" />
            </span>
            <div className={styles.detailName}>{category.name}</div>
          </div>

          <div className={`flex flex-col gap-2 ${styles.detailList}`}>
            <div className={`flex items-center gap-3 ${styles.detailRow}`}>
              <span className={`flex items-center justify-center ${styles.detailIcon} ${styles.iconBlue}`}>
                <AlignLeft size={15} />
              </span>
              <div className="min-w-0">
                <div className={styles.detailLabel}>Açıqlama</div>
                <div className={styles.detailValue}>{category.description}</div>
              </div>
            </div>
            <div className={`flex items-center gap-3 ${styles.detailRow}`}>
              <span className={`flex items-center justify-center ${styles.detailIcon} ${styles.iconGreen}`}>
                <Calendar size={15} />
              </span>
              <div className="min-w-0">
                <div className={styles.detailLabel}>Tarix</div>
                <div className={styles.detailValue}>{category.date}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}
