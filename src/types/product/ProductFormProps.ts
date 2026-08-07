import type { Category } from '@/types/category'
import type { Product } from './Product'
import type { ProductForm as ProductFormValues } from './ProductForm'

export interface ProductFormProps {
  open: boolean
  onClose: () => void
  editing: Product | null
  defaultValues: ProductFormValues
  submitting: boolean
  categoryOptions: Category[]
  onSubmit: (form: ProductFormValues) => void
}
