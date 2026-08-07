import { ChevronsUpDown, Filter } from 'lucide-react'
import styles from '@/pages/Protected/Orders/styles/OrdersTable.module.css'

// No column has neither filter nor sort wired up — stays purely decorative.
export const columnLabel = (text: string, extraClassName?: string) => (
  <span className={`flex items-center gap-2 ${styles.colLabel} ${extraClassName ?? ''}`}>
    {text}
    <span className="flex items-center gap-1">
      <ChevronsUpDown size={16} className={styles.colIcon} />
      <Filter size={16} className={styles.colIcon} />
    </span>
  </span>
)
