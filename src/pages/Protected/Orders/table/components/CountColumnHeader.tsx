import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Filter } from 'lucide-react'
import type { CountColumnHeaderProps } from '@/types/order'
import { useColumnMenu } from '@/pages/Protected/Orders/table/hooks/useColumnMenu'
import { SortTrigger } from '@/pages/Protected/Orders/table/components/SortTrigger'
import styles from '@/pages/Protected/Orders/styles/OrdersTable.module.css'

// Məhsul sayı's filter is a single exact-count match, not a bucketed
// checkbox list (1-5 / 6-10 / 10+, tried first and replaced on request) —
// typing "5" shows only orders with exactly 5 items. Reuses the same
// trigger+portal popover shape as DateColumnHeader (useColumnMenu), just
// with a number input instead of a calendar.
//
// The typed value is owned locally (useState), not passed down as a prop
// from useOrdersTable's countFilter — that state also drives
// useOrderColumnDefs' column-defs useMemo, so if this component's own
// display value came from there too, every keystroke would recompute that
// memo, hand this header a brand-new `header:` function reference, and React
// would remount this whole component (losing the just-opened popover's own
// open state) after the very first character. Owning the value locally also
// lets typing stay purely local — the actual filter (onChange, up to
// useOrdersTable's countFilter) is only pushed on Enter, not on every
// keystroke, so the table doesn't refilter mid-type.
export function CountColumnHeader({ label, onChange, sortDir, onSortClick, centered }: CountColumnHeaderProps) {
  const [value, setValue] = useState('')
  const { open, setOpen, pos, triggerRef, menuRef, openMenu } = useColumnMenu(170)

  const applyAndClose = () => {
    onChange(value)
    setOpen(false)
  }

  const handleClear = () => {
    setValue('')
    onChange('')
  }

  return (
    <span className={`flex items-center gap-2 ${centered ? `justify-center ${styles.colLabelCentered}` : ''} ${styles.colLabel}`}>
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
            <div className={styles.dateMenuLabel}>Məhsul sayı</div>
            <input
              type="number"
              min={0}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') applyAndClose()
              }}
              placeholder="Məs: 5"
              className={styles.filterSearchInput}
              autoFocus
            />
            {value && (
              <div className={`flex items-center gap-2 ${styles.dateMenuActions}`}>
                <button type="button" className={`cursor-pointer ${styles.filterClear}`} onClick={handleClear}>
                  Təmizlə
                </button>
              </div>
            )}
          </div>,
          document.body,
        )}
    </span>
  )
}
