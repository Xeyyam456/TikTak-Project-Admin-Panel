import { useOutletContext } from 'react-router-dom'
import { Plus } from 'lucide-react'
import Button from '@/shared/components/Button'
import ConfirmModal from '@/shared/components/ConfirmModal'
import Loading from '@/shared/components/Loading'
import { useTitle } from '@/shared/hooks/useTitle'
import CampaignForm from './components/CampaignForm'
import CampaignDetails from './components/CampaignDetails'
import CampaignsTable from './table'
import CampaignsPagination from './pagination'
import { useCampaignsData } from './queries'
import { useCampaignsPage } from './hooks'
import type { LayoutOutletContext } from '@/types/common'
import styles from '@/pages/Protected/Campaigns/styles/Campaigns.module.css'

export default function Campaigns() {
  useTitle('Kampaniyalar')
  const { search } = useOutletContext<LayoutOutletContext>()

  const { loading, filtered, page, setPage, pageSize, paged } = useCampaignsData(search)
  const {
    formOpen,
    setFormOpen,
    editing,
    defaultValues,
    deleteTarget,
    setDeleteTarget,
    viewTarget,
    setViewTarget,
    openCreate,
    openEdit,
    submitting,
    handleSubmit,
    confirmDelete,
  } = useCampaignsPage()

  return (
    <div>
      <div className={`flex flex-wrap items-center justify-between gap-3 ${styles.headerRow}`}>
        <h2 className={styles.heading}>Kampaniyalar</h2>
        <Button icon={Plus} onClick={() => openCreate()}>
          Yeni Kampaniya
        </Button>
      </div>

      {loading && <Loading />}

      <CampaignsTable
        items={paged}
        page={page}
        pageSize={pageSize}
        loading={loading}
        onView={setViewTarget}
        onEdit={openEdit}
        onDelete={setDeleteTarget}
      />

      <CampaignsPagination page={page} pageSize={pageSize} total={filtered.length} onPageChange={setPage} />

      <CampaignForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        editing={editing}
        defaultValues={defaultValues}
        submitting={submitting}
        onSubmit={handleSubmit}
      />

      <ConfirmModal
        open={!!deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        message="Məlumatı silməyə əminsinizmi?"
      />

      <CampaignDetails campaign={viewTarget} onClose={() => setViewTarget(null)} />
    </div>
  )
}
