import type { StatCardProps } from '@/types/shared'
import styles from './StatCard.module.css'

export default function StatCard({ label, value, icon: Icon, color }: StatCardProps) {
  return (
    <div className={`flex flex-col gap-2 ${styles.card}`}>
      <span className={styles.label}>{label}</span>
      <span className={`flex items-center gap-1.5 ${styles.value}`}>
        <Icon size={16} color={color} />
        {value}
      </span>
    </div>
  )
}
