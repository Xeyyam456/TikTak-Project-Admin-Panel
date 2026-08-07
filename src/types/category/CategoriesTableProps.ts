import type { Category } from './Category'

export interface CategoriesTableProps {
  items: Category[]
  page: number
  pageSize: number
  loading: boolean
  onView: (item: Category) => void
  onEdit: (item: Category) => void
  onDelete: (item: Category) => void
}
