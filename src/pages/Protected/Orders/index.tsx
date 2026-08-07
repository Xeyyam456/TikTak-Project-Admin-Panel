import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import StatCard from '@/shared/components/StatCard'
import Loading from '@/shared/components/Loading'
import { usePagination } from '@/shared/hooks/usePagination'
import { useTitle } from '@/shared/hooks/useTitle'
import OrderDetails from './components'
import OrdersTable, { useOrdersTable } from './table'
import OrdersPagination from './pagination'
import { useOrdersData, useOrderMutations } from './queries'
import { ORDER_STAT_CARDS } from './constants'
import type { LayoutOutletContext } from '@/types/common'
import styles from './styles/Orders.module.css'

export default function Orders() {
  useTitle('Sifarişlər')
  const { search } = useOutletContext<LayoutOutletContext>()

  const { orders, loading, stats } = useOrdersData()
  const { updateStatus } = useOrderMutations()

  const [selectedId, setSelectedId] = useState<number | null>(null)
  // always derived from the live `orders` list, so it reflects the latest
  // status/user data after a mutation refetch rather than a stale snapshot
  const selected = orders.find((o) => o.id === selectedId) ?? null

  const { rows, columns } = useOrdersTable(orders, search, setSelectedId)
  const { page, setPage, pageSize, setPageSize, paged } = usePagination(rows)

  return (
    <div>
      <h2 className={`flex items-center ${styles.heading}`}>Sifarişlər</h2>

      {loading && <Loading />}

      <div className={`gap-3 ${styles.stats}`}>
        {ORDER_STAT_CARDS.map(({ key, label, icon, color }) => (
          <StatCard key={key} label={label} value={stats[key]} icon={icon} color={color} />
        ))}
      </div>

      <OrdersTable columns={columns} rows={paged} loading={loading} />

      <OrdersPagination page={page} pageSize={pageSize} total={rows.length} onPageChange={setPage} onPageSizeChange={setPageSize} />

      <OrderDetails order={selected} onClose={() => setSelectedId(null)} onStatusChange={updateStatus} />
    </div>
  )
}
