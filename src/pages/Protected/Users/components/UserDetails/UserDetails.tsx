import { MapPin, Phone } from 'lucide-react'
import Modal from '@/shared/components/Modal'
import { USER_ROLE_LABELS } from '@/lib/constants/userRole'
import type { UserDetailsProps } from '@/types/user'
import styles from '@/pages/Protected/Users/styles/UserDetails.module.css'

export default function UserDetails({ user, onClose }: UserDetailsProps) {
  return (
    <Modal open={!!user} onClose={onClose} title="İstifadəçi məlumatları">
      {user && (
        <div>
          <div className={`flex items-center gap-3 ${styles.hero}`}>
            <span className={`flex items-center justify-center ${styles.detailAvatar}`} style={{ backgroundColor: user.color }}>
              {user.initial}
            </span>
            <div>
              <div className={styles.detailName}>{user.name}</div>
              <span className={`inline-flex items-center ${styles.roleBadge}`}>{USER_ROLE_LABELS[user.role] ?? user.role}</span>
            </div>
          </div>

          <div className={`flex flex-col gap-2 ${styles.detailList}`}>
            <div className={`flex items-center gap-3 ${styles.detailRow}`}>
              <span className={`flex items-center justify-center ${styles.detailIcon} ${styles.iconBlue}`}>
                <Phone size={15} />
              </span>
              <div className="min-w-0">
                <div className={styles.detailLabel}>Telefon</div>
                <div className={styles.detailValue}>{user.phone}</div>
              </div>
            </div>
            <div className={`flex items-center gap-3 ${styles.detailRow}`}>
              <span className={`flex items-center justify-center ${styles.detailIcon} ${styles.iconPurple}`}>
                <MapPin size={15} />
              </span>
              <div className="min-w-0">
                <div className={styles.detailLabel}>Ünvan</div>
                <div className={styles.detailValue}>{user.address}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}
