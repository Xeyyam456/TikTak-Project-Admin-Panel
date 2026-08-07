import { flexRender, type Header } from '@tanstack/react-table'
import type { Order } from '@/types/order'
import type { Column } from '@/types/common'
import { PINNED_WIDTHS } from './widths'

// Every other table's first column is a plain row number, centered by
// Table.module.css's default — Orders' first column is the order number
// (e.g. "ORD-20260802-036"), which reads better left-aligned like the rest
// of the row. A plain lookup instead of a nested ternary — easier to read,
// and easier to extend if a third column ever needs an override.
const ALIGN_OVERRIDES: Partial<Record<string, 'left' | 'center'>> = {
  no: 'left',
  count: 'center',
}

// Pure transform from tanstack's own header group to the plain Column[] the
// shared Table shell wants — needs no hook state, just the headers
// themselves. Pinned widths (widths.ts) go to their named column; every
// other column splits whatever's left equally between them (that split
// depends on headers.length, so it can't be precomputed in widths.ts itself).
export function buildColumnMeta(headers: Header<Order, unknown>[]): Column[] {
  let pinnedTotal = 0
  for (const width of Object.values(PINNED_WIDTHS)) {
    pinnedTotal += width ?? 0
  }
  const pinnedCount = Object.keys(PINNED_WIDTHS).length
  const remainingColumnCount = headers.length - pinnedCount
  const remainingWidthShare = (100 - pinnedTotal) / remainingColumnCount
  const restWidth = `${remainingWidthShare.toFixed(2)}%`

  return headers.map((header) => {
    const pinnedWidth = PINNED_WIDTHS[header.id]
    return {
      key: header.id,
      label: header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext()),
      width: pinnedWidth !== undefined ? `${pinnedWidth}%` : restWidth,
      align: ALIGN_OVERRIDES[header.id],
    }
  })
}
