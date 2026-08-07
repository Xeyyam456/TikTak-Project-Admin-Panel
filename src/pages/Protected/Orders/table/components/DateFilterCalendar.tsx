import { DayPicker } from 'react-day-picker'
import { az } from 'date-fns/locale'
import 'react-day-picker/style.css'
import type { DateFilterCalendarProps } from '@/types/order'
import { toDateInputValue, parseDateInputValue } from '@/pages/Protected/Orders/utils/filters'
import styles from '@/pages/Protected/Orders/styles/OrdersTable.module.css'

// Split out of DateColumnHeader.tsx specifically so react-day-picker (the
// bulk of what made Orders' route chunk ~174 KB, by far the largest of any
// page — Orders is also the page users land on right after login) can be
// `React.lazy`-loaded, only downloaded once the calendar popover actually
// opens instead of shipping with Orders' initial bundle. Default export is
// required for `lazy(() => import(...))`.
export default function DateFilterCalendar({ value, onChange }: DateFilterCalendarProps) {
  const today = () => onChange(toDateInputValue(new Date().toISOString()))

  return (
    <>
      <div className={styles.dateMenuLabel}>Tarix seçin</div>
      <DayPicker
        mode="single"
        locale={az}
        selected={parseDateInputValue(value)}
        onSelect={(date) => onChange(date ? toDateInputValue(date.toISOString()) : '')}
        weekStartsOn={1}
        className={styles.dayPicker}
      />
      <div className={`flex items-center gap-2 ${styles.dateMenuActions}`}>
        <button type="button" className={`cursor-pointer ${styles.dateTodayBtn}`} onClick={today}>
          Bugün
        </button>
        {value && (
          <button type="button" className={`cursor-pointer ${styles.filterClear}`} onClick={() => onChange('')}>
            Təmizlə
          </button>
        )}
      </div>
    </>
  )
}
