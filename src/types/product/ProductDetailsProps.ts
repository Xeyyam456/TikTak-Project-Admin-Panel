import type { Product } from './Product'

export interface ProductDetailsProps {
  product: Product | null
  onClose: () => void
}
