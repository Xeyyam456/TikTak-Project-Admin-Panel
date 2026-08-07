import { useQuery } from '@tanstack/react-query'
import { listOrders, getOrderStats } from '@/services/orderService'
import { mapOrderFromApi } from '@/lib/adapters/order'
import type { OrderStats } from '@/types/order'
import type { OrderStatus } from '@/lib/constants/orderStatus'

const emptyStats: OrderStats = { TOTAL: 0, DELIVERED: 0, PENDING: 0, PREPARING: 0, CANCELLED: 0, TOTAL_REVENUE: 0 }

// TOTAL hər zaman var, digər statuslar sifariş siyahısında rast gəlindikcə əlavə olunur —
// ona görə TOTAL adi `number`, qalanları isə "ola da bilər, olmaya da" mənasında `Partial`.
type StatusCounts = { TOTAL: number } & Partial<Record<OrderStatus, number>>

export function useOrdersData() {
  const { data: orders = [], isLoading: loading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => listOrders().then((data) => data.map(mapOrderFromApi)),
  })
  const { data: statsData } = useQuery({
    queryKey: ['orderStats'],
    queryFn: getOrderStats,
  })

  // `/orders/admin/stats` doesn't reliably include every OrderStatus counter
  // (CANCELLED in particular can come back missing, see docs/API.md §8.2) —
  // `orders` is already the full unpaginated list, so count statuses from it
  // directly instead of trusting the backend summary for per-status counts.
  const statusCounts = orders.reduce<StatusCounts>(
    (acc, o) => {
      acc.TOTAL += 1
      acc[o.status] = (acc[o.status] ?? 0) + 1
      return acc
    },
    { TOTAL: 0 },
  )
  const stats: OrderStats = { ...emptyStats, ...statsData, ...statusCounts }

  return { orders, loading, stats }
}
