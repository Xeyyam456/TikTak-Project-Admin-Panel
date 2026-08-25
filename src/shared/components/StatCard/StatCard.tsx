import { useCountUp } from '@/shared/hooks/useCountUp'
import type { StatCardProps } from '@/types/shared'
import styles from './StatCard.module.css'

export default function StatCard({ label, value, icon: Icon, color }: StatCardProps) {
  // `useCountUp` always runs (rules of hooks — can't call it conditionally),
  // but its result is only rendered when `value` is actually a number; a
  // non-numeric `value` (ReactNode) just passes through unanimated.
  const animated = useCountUp(typeof value === 'number' ? value : 0)

  return (
    <div className={`flex flex-col gap-2 ${styles.card}`}>
      <span className={styles.label}>{label}</span>
      <span className={`flex items-center gap-1.5 ${styles.value}`}>
        <Icon size={16} color={color} />
        {typeof value === 'number' ? animated.toLocaleString('az') : value}
      </span>
    </div>
  )
}
