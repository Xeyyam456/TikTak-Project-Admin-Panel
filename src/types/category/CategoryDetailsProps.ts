import type { Category } from './Category'

export interface CategoryDetailsProps {
  category: Category | null
  onClose: () => void
}
