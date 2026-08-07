import { useCrudModal } from '@/shared/hooks/useCrudModal'
import { mapCategoryToApi } from '@/lib/adapters/category'
import { useCategoryMutations } from '@/pages/Protected/Categories/queries'
import { emptyForm } from '@/pages/Protected/Categories/constants'
import type { Category, CategoryForm as CategoryFormValues } from '@/types/category'

const toForm = (item: Category): CategoryFormValues => ({
  image: item.image,
  color: item.color,
  imageUrl: item.imageUrl || '',
  name: item.name,
  description: item.description,
})

// Owns the create/edit/delete/view modal state + the mutations behind it —
// everything the page's form/table/modals need beyond the list itself
// (see `queries/useCategoriesData.ts` for the list/search/pagination side).
export function useCategoriesPage() {
  const { createMutation, updateMutation, deleteMutation } = useCategoryMutations()

  const { formOpen, setFormOpen, editing, deleteTarget, setDeleteTarget, viewTarget, setViewTarget, openCreate, openEdit } =
    useCrudModal<Category, CategoryFormValues>(emptyForm, toForm)

  const handleSubmit = async (form: CategoryFormValues) => {
    try {
      const payload = mapCategoryToApi(form)
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
