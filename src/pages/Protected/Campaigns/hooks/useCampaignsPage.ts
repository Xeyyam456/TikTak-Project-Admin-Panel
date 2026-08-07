import { useCrudModal } from '@/shared/hooks/useCrudModal'
import { mapCampaignToApi } from '@/lib/adapters/campaign'
import { useCampaignMutations } from '@/pages/Protected/Campaigns/queries'
import { emptyForm } from '@/pages/Protected/Campaigns/constants'
import type { Campaign, CampaignForm as CampaignFormValues } from '@/types/campaign'

const toForm = (item: Campaign): CampaignFormValues => ({
  image: item.image,
  color: item.color,
  imageUrl: item.imageUrl || '',
  title: item.title,
  description: item.description,
})

// Owns the create/edit/delete/view modal state + the mutations behind it —
// everything the page's form/table/modals need beyond the list itself
// (see `queries/useCampaignsData.ts` for the list/search/pagination side).
export function useCampaignsPage() {
  const { createMutation, updateMutation, deleteMutation } = useCampaignMutations()

  const { formOpen, setFormOpen, editing, deleteTarget, setDeleteTarget, viewTarget, setViewTarget, openCreate, openEdit } =
    useCrudModal<Campaign, CampaignFormValues>(emptyForm, toForm)

  const handleSubmit = async (form: CampaignFormValues) => {
    try {
      const payload = mapCampaignToApi(form)
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
