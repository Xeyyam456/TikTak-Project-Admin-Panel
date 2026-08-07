import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createProduct, updateProduct, deleteProduct } from '@/services/productService'
import type { ProductPayload } from '@/types/product'

export function useProductMutations() {
  const queryClient = useQueryClient()
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['products'] })

  const createMutation = useMutation({
    mutationFn: createProduct,
    // Not awaited: `mutateAsync` (see useProductsPage.ts) only resolves once
    // this onSuccess itself resolves, and the page closes its modal right
    // after that await — awaiting `invalidate()` here meant the modal sat
    // open for the write *and* the refetch it triggers, back to back. Firing
    // it without awaiting lets the modal close as soon as the write
    // succeeds; the list still refreshes moments later once the background
    // refetch lands.
    onSuccess: () => {
      invalidate()
      toast.success('Məhsul yaradıldı')
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: ProductPayload }) => updateProduct(id, payload),
    onSuccess: () => {
      invalidate()
      toast.success('Məhsul yeniləndi')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      invalidate()
      toast.success('Məhsul silindi')
    },
  })

  return { createMutation, updateMutation, deleteMutation }
}
