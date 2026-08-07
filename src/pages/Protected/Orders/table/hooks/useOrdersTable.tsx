import { useMemo, useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  createColumnHelper,
  type ColumnFiltersState,
  type SortingState,
} from '@tanstack/react-table'
import type { OrderStatus } from '@/lib/constants/orderStatus'
import type { Order, SortKey, SortState, CountBucket, ShippingBucket } from '@/types/order'
import type { Column } from '@/types/common'
import { globalFilterFn } from '@/pages/Protected/Orders/utils/filters'
import { useOrderColumnDefs } from './useOrderColumnDefs'
import { buildColumnMeta } from '@/pages/Protected/Orders/table/columns'

export function useOrdersTable(orders: Order[], search: string, onView: (id: number) => void) {
  const [statusFilter, setStatusFilter] = useState<Set<OrderStatus>>(new Set())
  const [dateFilter, setDateFilter] = useState('')
  const [countFilter, setCountFilter] = useState<Set<CountBucket>>(new Set())
  const [shippingFilter, setShippingFilter] = useState<Set<ShippingBucket>>(new Set())
  const [sort, setSort] = useState<SortState>(null)

  const toggleSort = (key: SortKey) => {
    setSort((current) => {
      if (current?.key !== key) return { key, dir: 'asc' }
      if (current.dir === 'asc') return { key, dir: 'desc' }
      return null
    })
  }

  const columnHelper = useMemo(() => createColumnHelper<Order>(), [])

  const tableColumnDefs = useOrderColumnDefs({
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
  })

  // Same four filters as before, just handed to tanstack as ColumnFiltersState
  // instead of chained `&&` conditions — each column's filterFn (filters.ts)
  // already treats an empty Set/string as "no filter", so all four are always present.
  const columnFilters = useMemo<ColumnFiltersState>(
    () => [
      { id: 'status', value: statusFilter },
      { id: 'date', value: dateFilter },
      { id: 'count', value: countFilter },
      { id: 'subtotal', value: shippingFilter },
    ],
    [statusFilter, dateFilter, countFilter, shippingFilter],
  )

  const sortingState = useMemo<SortingState>(() => (sort ? [{ id: sort.key, desc: sort.dir === 'desc' }] : []), [sort])

  const table = useReactTable({
    data: orders,
    columns: tableColumnDefs,
    state: { columnFilters, sorting: sortingState, globalFilter: search },
    globalFilterFn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const rows = table.getRowModel().rows

  // Table (the shared shell) still just wants a plain Column[] — build it
  // from tanstack's own header group so the shell stays library-agnostic.
  const columns: Column[] = buildColumnMeta(table.getHeaderGroups()[0]!.headers)

  return { table, rows, columns }
}
