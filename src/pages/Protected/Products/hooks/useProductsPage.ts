import { useCrudModal } from '@/shared/hooks/useCrudModal'
import { mapProductToApi } from '@/lib/adapters/product'
import { useProductMutations } from '@/pages/Protected/Products/queries'
import { emptyForm } from '@/pages/Protected/Products/constants'
import type { Product, ProductForm as ProductFormValues } from '@/types/product'

const toForm = (item: Product): ProductFormValues => ({
  image: item.image,
  color: item.color,
  imageUrl: item.imageUrl || '',
  name: item.name,
  description: item.description,
  price: item.price,
  category_id: item.category_id,
  type: item.type,
})

// Owns the create/edit/delete/view modal state + the mutations behind it —
// everything the page's form/table/modals need beyond the list itself
// (see `queries/useProductsData.ts` for the list/search/pagination/category-options side).
export function useProductsPage() {
  const { createMutation, updateMutation, deleteMutation } = useProductMutations()

  const { formOpen, setFormOpen, editing, deleteTarget, setDeleteTarget, viewTarget, setViewTarget, openCreate, openEdit } =
    useCrudModal<Product, ProductFormValues>(emptyForm, toForm)

  const handleSubmit = async (form: ProductFormValues) => {
    try {
      const payload = mapProductToApi(form)
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, payload })
      } else {
        await createMutation.mutateAsync(payload)
      }
      setFormOpen(false)
    } catch {
      // error already toasted by the global mutation cache
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    try {
      await deleteMutation.mutateAsync(deleteTarget.id)
    } catch {
      // error already toasted by the global mutation cache
    } finally {
      setDeleteTarget(null)
    }
  }

  return {
    formOpen,
    setFormOpen,
    editing,
    defaultValues: editing ? toForm(editing) : emptyForm,
    deleteTarget,
    setDeleteTarget,
    viewTarget,
    setViewTarget,
    openCreate,
    openEdit,
    submitting: createMutation.isPending || updateMutation.isPending,
    handleSubmit,
    confirmDelete,
  }
}
