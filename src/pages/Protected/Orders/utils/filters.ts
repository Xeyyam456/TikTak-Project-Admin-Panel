import type { FilterFn } from '@tanstack/react-table'
import type { Order, ShippingBucket } from '@/types/order'
import type { OrderStatus } from '@/lib/constants/orderStatus'

export const SHIPPING_BUCKETS: readonly ShippingBucket[] = ['Pulsuz', 'Ödənişli']
export const matchesShipping = (freeShipping: boolean, bucket: ShippingBucket) =>
  bucket === 'Pulsuz' ? freeShipping : !freeShipping

// yyyy-mm-dd using local-time getters (matching formatDate's approach), so it
// lines up with what an <input type="date"> produces and with what's actually
// displayed — using toISOString() here could shift the date by a day near
// midnight in timezones behind/ahead of UTC.
export const toDateInputValue = (iso: string) => {
  const d = new Date(iso)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

// The reverse of toDateInputValue, for handing the stored `yyyy-mm-dd` string
// to react-day-picker's `selected` prop. Deliberately NOT `new Date(value)` —
// the Date constructor parses a bare date-only string as UTC midnight per
// spec, which local getters would then read back as the previous day in any
// timezone behind UTC. Building the Date from y/m/d components instead is
// unambiguously local, same reasoning as toDateInputValue above.
export const parseDateInputValue = (value: string): Date | undefined => {
  if (!value) return undefined
  const [yyyy, mm, dd] = value.split('-').map(Number)
  return new Date(yyyy!, mm! - 1, dd)
}

// One filterFn per filterable column, handed to tanstack-table's column defs
// in useOrdersTable — this replaces a hand-written `.filter()` chain with
// tanstack's own getFilteredRowModel.
export const dateFilterFn: FilterFn<Order> = (row, _columnId, filterValue: string) =>
  filterValue === '' || toDateInputValue(row.original.createdAt) === filterValue

export const statusFilterFn: FilterFn<Order> = (row, _columnId, filterValue: Set<OrderStatus>) =>
  filterValue.size === 0 || filterValue.has(row.original.status)

// Exact match against the entered number — "" means no filter applied.
export const countFilterFn: FilterFn<Order> = (row, _columnId, filterValue: string) =>
  filterValue === '' || row.original.itemCount === Number(filterValue)

export const shippingFilterFn: FilterFn<Order> = (row, _columnId, filterValue: Set<ShippingBucket>) =>
  filterValue.size === 0 || [...filterValue].some((b) => matchesShipping(row.original.freeShipping, b))

// Matches the search box in AdminLayout's header (see LayoutOutletContext),
// wired in as tanstack's globalFilterFn instead of a hand-written .filter().
export const globalFilterFn: FilterFn<Order> = (row, _columnId, filterValue: string) =>
  `${row.original.orderNumber} ${row.original.address}`.toLocaleLowerCase('az').includes(filterValue.toLocaleLowerCase('az'))
