import type { Row } from '@tanstack/react-table'
import type { Order } from './Order'
import type { Column } from '../common'

export interface OrdersTableProps {
  columns: Column[]
  rows: Row<Order>[]
  loading: boolean
}
