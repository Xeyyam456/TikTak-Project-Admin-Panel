import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { listCampaigns } from '@/services/campaignService'
import { mapCampaignFromApi } from '@/lib/adapters/campaign'
import { usePagination } from '@/shared/hooks/usePagination'

export function useCampaignsData(search: string) {
  const { data: campaigns = [], isLoading: loading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: () => listCampaigns().then((data) => data.map(mapCampaignFromApi)),
  })

  const filtered = useMemo(
    () =>
      campaigns.filter((c) =>
        `${c.title} ${c.description}`.toLocaleLowerCase('az').includes(search.toLocaleLowerCase('az')),
      ),
    [campaigns, search],
  )

  // 7, not usePagination's own default of 5 — 5 rows left visible dead space
  // below the table before Pagination, since the page chrome comfortably
  // fits 7 rows at typical viewport heights.
  const { page, setPage, pageSize, paged } = usePagination(filtered, 7)

  return { loading, filtered, page, setPage, pageSize, paged }
}
