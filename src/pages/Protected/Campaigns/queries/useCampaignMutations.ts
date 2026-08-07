import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createCampaign, updateCampaign, deleteCampaign } from '@/services/campaignService'
import type { CampaignPayload } from '@/types/campaign'

export function useCampaignMutations() {
  const queryClient = useQueryClient()
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['campaigns'] })

  const createMutation = useMutation({
    mutationFn: createCampaign,
    // Not awaited: `mutateAsync` (see useCampaignsPage.ts) only resolves
    // once this onSuccess itself resolves, and the page closes its modal
    // right after that await — awaiting `invalidate()` here meant the modal
    // sat open for the write *and* the refetch it triggers, back to back.
    // Firing it without awaiting lets the modal close as soon as the write
    // succeeds; the list still refreshes moments later once the background
    // refetch lands.
    onSuccess: () => {
      invalidate()
      toast.success('Kampaniya yaradıldı')
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: CampaignPayload }) => updateCampaign(id, payload),
    onSuccess: () => {
      invalidate()
      toast.success('Kampaniya yeniləndi')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteCampaign,
    onSuccess: () => {
      invalidate()
      toast.success('Kampaniya silindi')
    },
  })

  return { createMutation, updateMutation, deleteMutation }
}
