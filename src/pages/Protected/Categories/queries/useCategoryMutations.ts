import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createCategory, updateCategory, deleteCategory } from '@/services/categoryService'
import type { CategoryPayload } from '@/types/category'

export function useCategoryMutations() {
  const queryClient = useQueryClient()
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['categories'] })

  const createMutation = useMutation({
    mutationFn: createCategory,
    // Not awaited: `mutateAsync` (see useCategoriesPage.ts) only resolves
    // once this onSuccess itself resolves, and the page closes its modal
    // right after that await — awaiting `invalidate()` here meant the modal
    // sat open for the write *and* the refetch it triggers, back to back.
    // Firing it without awaiting lets the modal close as soon as the write
    // succeeds; the list still refreshes moments later once the background
    // refetch lands.
    onSuccess: () => {
      invalidate()
      toast.success('Kateqoriya yaradıldı')
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: CategoryPayload }) => updateCategory(id, payload),
    onSuccess: () => {
      invalidate()
      toast.success('Kateqoriya yeniləndi')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      invalidate()
      toast.success('Kateqoriya silindi')
    },
  })

  return { createMutation, updateMutation, deleteMutation }
}
