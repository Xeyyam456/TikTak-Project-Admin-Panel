// Column width constants for useOrdersTable.tsx — pulled into their own file
// like the other four pages' table/columns/widths.ts, since these numbers
// get tuned independently of the column definitions themselves. `count`
// (Məhsul sayı), `address` (Çatdırılma ünvanı), and `subtotal`
// (Subtotal/Çatdırılma) are pinned to fixed `%`s on request; every other
// column splits whatever's left equally between them. Unlike the other four
// pages, the actual per-column `width` values can't be fully static here —
// the equal-split share among the non-pinned columns depends on
// `headers.length` at render time, so that last computation stays in
// columnMeta.ts and only reads PINNED_WIDTHS from here.
export const COUNT_WIDTH = 14
export const ADDRESS_WIDTH = 18
export const SUBTOTAL_WIDTH = 18

export const PINNED_WIDTHS: Partial<Record<string, number>> = {
  count: COUNT_WIDTH,
  address: ADDRESS_WIDTH,
  subtotal: SUBTOTAL_WIDTH,
}
