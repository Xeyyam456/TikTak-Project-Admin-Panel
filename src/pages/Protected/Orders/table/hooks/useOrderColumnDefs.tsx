import { useMemo } from 'react'
import type { ColumnHelper } from '@tanstack/react-table'
import { ORDER_STATUS_OPTIONS } from '@/lib/constants/orderStatus'
import type { OrderStatus } from '@/lib/constants/orderStatus'
import type { Order, SortKey, SortState, CountBucket, ShippingBucket } from '@/types/order'
import { columnLabel } from '@/pages/Protected/Orders/table/components/columnLabel'
import { dateHeader, countHeader, subtotalHeader, statusHeader } from '@/pages/Protected/Orders/table/components/headerRenderers'
import { countCell, subtotalCell, statusCell, actionCell } from '@/pages/Protected/Orders/table/components/cellRenderers'
import { dateFilterFn, statusFilterFn, countFilterFn, shippingFilterFn } from '@/pages/Protected/Orders/utils/filters'
import styles from '@/pages/Protected/Orders/styles/OrdersTable.module.css'

interface UseOrderColumnDefsParams {
  columnHelper: ColumnHelper<Order>
  statusFilter: Set<OrderStatus>
  setStatusFilter: (next: Set<OrderStatus>) => void
  dateFilter: string
  setDateFilter: (next: string) => void
  countFilter: Set<CountBucket>
  setCountFilter: (next: Set<CountBucket>) => void
  shippingFilter: Set<ShippingBucket>
  setShippingFilter: (next: Set<ShippingBucket>) => void
  sort: SortState
  toggleSort: (key: SortKey) => void
  onView: (id: number) => void
}

// tanstack owns the actual filter/sort computation (getFilteredRowModel /
// getSortedRowModel in useOrdersTable.tsx) — these defs just wire our own
// header/cell JSX (headerRenderers.tsx / cellRenderers.tsx) + filterFn/
// sortingFn to it.
export function useOrderColumnDefs({
  columnHelper,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
  countFilter,
  setCountFilter,
  shippingFilter,
  setShippingFilter,
  sort,
  toggleSort,
  onView,
}: UseOrderColumnDefsParams) {
  return useMemo(
    () => [
      columnHelper.display({
        id: 'no',
        header: () => columnLabel('No', styles.noColLabel),
        cell: (info) => info.row.original.orderNumber,
        meta: { width: '16%' },
      }),
      columnHelper.accessor((o) => o.createdAt, {
        id: 'date',
        header: () => dateHeader(dateFilter, setDateFilter, sort, toggleSort),
        cell: (info) => info.row.original.date,
        filterFn: dateFilterFn,
        sortingFn: (a, b) => a.original.createdAt.localeCompare(b.original.createdAt),
        meta: { width: 115 },
      }),
      columnHelper.display({
        id: 'address',
        header: () => columnLabel('Çatdırılma ünvanı'),
        cell: (info) => info.row.original.address,
      }),
      columnHelper.accessor((o) => o.itemCount, {
        id: 'count',
        header: () => countHeader(countFilter, setCountFilter, sort, toggleSort),
        cell: (info) => countCell(info.row.original),
        filterFn: countFilterFn,
        sortingFn: 'basic',
        meta: { width: 150 },
      }),
      columnHelper.accessor((o) => Number(o.subtotal), {
        id: 'subtotal',
        header: () => subtotalHeader(shippingFilter, setShippingFilter, sort, toggleSort),
        cell: (info) => subtotalCell(info.row.original),
        filterFn: shippingFilterFn,
        sortingFn: 'basic',
        meta: { width: 195 },
      }),
      columnHelper.accessor((o) => ORDER_STATUS_OPTIONS.indexOf(o.status), {
        id: 'status',
        header: () => statusHeader(statusFilter, setStatusFilter, sort, toggleSort),
        cell: (info) => statusCell(info.row.original),
        filterFn: statusFilterFn,
        sortingFn: 'basic',
        meta: { width: 145 },
      }),
      columnHelper.display({
        id: 'action',
        header: 'Əməliyyat',
        cell: (info) => actionCell(info.row.original, onView),
        meta: { width: 100 },
      }),
    ],
    [columnHelper, statusFilter, dateFilter, countFilter, shippingFilter, sort, onView],
  )
}
