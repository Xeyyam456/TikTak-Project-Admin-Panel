import { ORDER_STATUS_LABELS, ORDER_STATUS_OPTIONS } from '@/lib/constants/orderStatus'
import type { OrderStatus } from '@/lib/constants/orderStatus'
import type { SortState, SortKey, CountBucket, ShippingBucket } from '@/types/order'
import { ColumnHeader } from './ColumnHeader'
import { DateColumnHeader } from './DateColumnHeader'
import { COUNT_BUCKETS, SHIPPING_BUCKETS } from '@/pages/Protected/Orders/utils/filters'

export const dateHeader = (
  value: string,
  onChange: (next: string) => void,
  sort: SortState,
  toggleSort: (key: SortKey) => void,
) => (
  <DateColumnHeader
    label="Tarix"
    value={value}
    onChange={onChange}
    sortDir={sort?.key === 'date' ? sort.dir : null}
    onSortClick={() => toggleSort('date')}
  />
)

export const countHeader = (
  value: Set<CountBucket>,
  onChange: (next: Set<CountBucket>) => void,
  sort: SortState,
  toggleSort: (key: SortKey) => void,
) => (
  <ColumnHeader
    label="Məhsul sayı"
    options={COUNT_BUCKETS}
    value={value}
    onChange={onChange}
    sortDir={sort?.key === 'count' ? sort.dir : null}
    onSortClick={() => toggleSort('count')}
    centered
  />
)

export const subtotalHeader = (
  value: Set<ShippingBucket>,
  onChange: (next: Set<ShippingBucket>) => void,
  sort: SortState,
  toggleSort: (key: SortKey) => void,
) => (
  <ColumnHeader
    label="Subtotal/Çatdırılma"
    options={SHIPPING_BUCKETS}
    value={value}
    onChange={onChange}
    sortDir={sort?.key === 'subtotal' ? sort.dir : null}
    onSortClick={() => toggleSort('subtotal')}
  />
)

export const statusHeader = (
  value: Set<OrderStatus>,
  onChange: (next: Set<OrderStatus>) => void,
  sort: SortState,
  toggleSort: (key: SortKey) => void,
) => (
  <ColumnHeader
    label="Status"
    options={ORDER_STATUS_OPTIONS}
    getOptionLabel={(s) => ORDER_STATUS_LABELS[s]}
    value={value}
    onChange={onChange}
    sortDir={sort?.key === 'status' ? sort.dir : null}
    onSortClick={() => toggleSort('status')}
  />
)
