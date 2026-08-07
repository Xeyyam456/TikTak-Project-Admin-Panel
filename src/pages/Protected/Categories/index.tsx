import { useOutletContext } from 'react-router-dom'
import { Plus } from 'lucide-react'
import Button from '@/shared/components/Button'
import ConfirmModal from '@/shared/components/ConfirmModal'
import Loading from '@/shared/components/Loading'
import { useTitle } from '@/shared/hooks/useTitle'
import CategoryForm from './components/CategoryForm'
import CategoryDetails from './components/CategoryDetails'
import CategoriesTable from './table'
import CategoriesPagination from './pagination'
import { useCategoriesData } from './queries'
import { useCategoriesPage } from './hooks'
import type { LayoutOutletContext } from '@/types/common'
import styles from '@/pages/Protected/Categories/styles/Categories.module.css'

export default function Categories() {
  useTitle('Kateqoriyalar')
  const { search } = useOutletContext<LayoutOutletContext>()

  const { loading, filtered, page, setPage, pageSize, paged } = useCategoriesData(search)
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
  } = useCategoriesPage()

  return (
    <div>
      <div className={`flex flex-wrap items-center justify-between gap-3 ${styles.headerRow}`}>
        <h2 className={styles.heading}>Kateqoriyalar</h2>
        <Button icon={Plus} onClick={() => openCreate()}>
          Yeni Kateqoriya
        </Button>
      </div>

      {loading && <Loading />}

      <CategoriesTable
        items={paged}
        page={page}
        pageSize={pageSize}
        loading={loading}
        onView={setViewTarget}
        onEdit={openEdit}
        onDelete={setDeleteTarget}
      />

      <CategoriesPagination page={page} pageSize={pageSize} total={filtered.length} onPageChange={setPage} />

      <CategoryForm
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

      <CategoryDetails category={viewTarget} onClose={() => setViewTarget(null)} />
    </div>
  )
}
