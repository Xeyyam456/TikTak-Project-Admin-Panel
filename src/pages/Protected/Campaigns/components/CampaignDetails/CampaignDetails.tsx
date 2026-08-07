import { AlignLeft, Calendar } from 'lucide-react'
import Modal from '@/shared/components/Modal'
import Thumbnail from '@/shared/components/Thumbnail'
import type { CampaignDetailsProps } from '@/types/campaign'
import styles from '@/pages/Protected/Campaigns/styles/CampaignDetails.module.css'

export default function CampaignDetails({ campaign, onClose }: CampaignDetailsProps) {
  return (
    <Modal open={!!campaign} onClose={onClose} title="Kampaniya məlumatları" wide>
      {campaign && (
        <div>
          <div className={`flex items-center gap-3 ${styles.hero}`}>
            <span className={styles.thumbRing}>
              <Thumbnail imageUrl={campaign.imageUrl} image={campaign.image} color={campaign.color} size="lg" />
            </span>
            <div className={styles.detailName}>{campaign.title}</div>
          </div>

          <div className={`flex flex-col gap-2 ${styles.detailList}`}>
            <div className={`flex items-center gap-3 ${styles.detailRow}`}>
              <span className={`flex items-center justify-center ${styles.detailIcon} ${styles.iconBlue}`}>
                <AlignLeft size={15} />
              </span>
              <div className="min-w-0">
                <div className={styles.detailLabel}>Açıqlama</div>
                <div className={styles.detailValue}>{campaign.description}</div>
              </div>
            </div>
            <div className={`flex items-center gap-3 ${styles.detailRow}`}>
              <span className={`flex items-center justify-center ${styles.detailIcon} ${styles.iconGreen}`}>
                <Calendar size={15} />
              </span>
              <div className="min-w-0">
                <div className={styles.detailLabel}>Tarix</div>
                <div className={styles.detailValue}>{campaign.date}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}
