// `/orders/admin/stats` is documented as possibly omitting some counters
// (e.g. CANCELLED) — the raw fetch is typed Partial<OrderStats> at the
// service boundary (see orderService.ts) and only becomes fully non-partial
// after Orders.jsx merges it with its own client-computed status counts.
export interface OrderStats {
  TOTAL: number
  DELIVERED: number
  PENDING: number
  PREPARING: number
  CANCELLED: number
  TOTAL_REVENUE: number
}
