import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import styles from '@/pages/Protected/Orders/styles/OrdersTable.module.css'

export function SortTrigger({ label, sortDir, onClick }: { label: string; sortDir?: 'asc' | 'desc' | null; onClick?: () => void }) {
  if (!onClick) return <ChevronsUpDown size={16} className={styles.colIcon} />
  const SortIcon = sortDir === 'asc' ? ChevronUp : sortDir === 'desc' ? ChevronDown : ChevronsUpDown
  return (
    <button
      type="button"
      className={`flex cursor-pointer ${styles.filterTrigger} ${sortDir ? styles.filterActive : ''}`}
      onClick={onClick}
      aria-label={`${label} sırala`}
    >
      <SortIcon size={16} />
    </button>
  )
}
