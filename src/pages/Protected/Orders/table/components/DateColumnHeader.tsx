import { lazy, Suspense } from 'react'
import { createPortal } from 'react-dom'
import { Filter } from 'lucide-react'
import type { DateColumnHeaderProps } from '@/types/order'
import { useColumnMenu } from '@/pages/Protected/Orders/table/hooks/useColumnMenu'
import { SortTrigger } from '@/pages/Protected/Orders/table/components/SortTrigger'
import styles from '@/pages/Protected/Orders/styles/OrdersTable.module.css'

// react-day-picker only needs to load once the popover is actually opened,
// not for the always-visible trigger button/icon this header renders on
// every page load — see DateFilterCalendar.tsx for why this is lazy.
const DateFilterCalendar = lazy(() => import('@/pages/Protected/Orders/table/components/DateFilterCalendar'))

// Tarix's filter is a single selectable date, not a checkbox list — the order
// list can have a distinct date per row, so a checklist doesn't scale the way
// it does for Status; a date picker lets you jump straight to a day.
export function DateColumnHeader({ label, value, onChange, sortDir, onSortClick }: DateColumnHeaderProps) {
  const { open, setOpen, pos, triggerRef, menuRef, openMenu } = useColumnMenu(190)

  return (
    <span className={`flex items-center gap-2 ${styles.colLabel}`}>
      {label}
      <span className="flex items-center gap-1">
        <SortTrigger label={label} sortDir={sortDir} onClick={onSortClick} />
        <button
          type="button"
          ref={triggerRef}
          className={`cursor-pointer ${styles.filterTrigger} ${value ? styles.filterActive : ''}`}
          onClick={() => (open ? setOpen(false) : openMenu())}
          aria-label={`${label} filtri`}
        >
          <Filter size={16} />
        </button>
      </span>
      {open &&
        createPortal(
          <div ref={menuRef} className={`flex flex-col gap-2.5 ${styles.dateMenu}`} style={{ top: pos.top, left: pos.left }}>
            <Suspense fallback={<div className={styles.dateMenuLabel}>Yüklənir...</div>}>
              <DateFilterCalendar value={value} onChange={onChange} />
            </Suspense>
          </div>,
          document.body,
        )}
    </span>
  )
}
