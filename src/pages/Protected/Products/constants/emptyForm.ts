import type { ProductForm as ProductFormValues } from '@/types/product'

export const emptyForm: ProductFormValues = {
  image: '📦',
  color: '#f3f4f6',
  imageUrl: '',
  name: '',
  description: '',
  price: '',
  category_id: '',
  type: 'piece',
}
