import type { Product } from './Product'

export interface ProductsTableProps {
  items: Product[]
  page: number
  pageSize: number
  loading: boolean
  onView: (item: Product) => void
  onEdit: (item: Product) => void
  onDelete: (item: Product) => void
}
