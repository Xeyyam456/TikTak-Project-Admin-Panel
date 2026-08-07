import type { Category } from './Category'
import type { CategoryForm as CategoryFormValues } from './CategoryForm'

export interface CategoryFormProps {
  open: boolean
  onClose: () => void
  editing: Category | null
  defaultValues: CategoryFormValues
  submitting: boolean
  onSubmit: (form: CategoryFormValues) => void
}
