import type { BadgeProps } from '@/types/shared'
import styles from './Badge.module.css'

export default function Badge({ color = 'green', children }: BadgeProps) {
  return <span className={`inline-flex items-center ${styles.badge} ${styles[color]}`}>{children}</span>
}
