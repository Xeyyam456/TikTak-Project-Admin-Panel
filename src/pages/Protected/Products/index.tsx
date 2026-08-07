import { useOutletContext } from 'react-router-dom'
import { Plus } from 'lucide-react'
import Button from '@/shared/components/Button'
import ConfirmModal from '@/shared/components/ConfirmModal'
import Loading from '@/shared/components/Loading'
import { useTitle } from '@/shared/hooks/useTitle'
import ProductForm from './components/ProductForm'
import ProductDetails from './components/ProductDetails'
import ProductsTable from './table'
import ProductsPagination from './pagination'
import { useProductsData } from './queries'
import { useProductsPage } from './hooks'
import type { LayoutOutletContext } from '@/types/common'
import styles from '@/pages/Protected/Products/styles/Products.module.css'

export default function Products() {
  useTitle('Məhsullar')
  const { search } = useOutletContext<LayoutOutletContext>()

  const { loading, filtered, page, setPage, pageSize, paged, categoryOptions } = useProductsData(search)
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
  } = useProductsPage()

  return (
    <div>
      <div className={`flex flex-wrap items-center justify-between gap-3 ${styles.headerRow}`}>
        <h2 className={styles.heading}>Məhsullar</h2>
        <Button icon={Plus} onClick={() => openCreate({ category_id: categoryOptions[0]?.id ?? '' })}>
          Yeni Məhsul
        </Button>
      </div>

      {loading && <Loading />}

      <ProductsTable
        items={paged}
        page={page}
        pageSize={pageSize}
        loading={loading}
        onView={setViewTarget}
        onEdit={openEdit}
        onDelete={setDeleteTarget}
      />

      <ProductsPagination page={page} pageSize={pageSize} total={filtered.length} onPageChange={setPage} />

      <ProductForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        editing={editing}
        defaultValues={defaultValues}
        submitting={submitting}
        categoryOptions={categoryOptions}
        onSubmit={handleSubmit}
      />

      <ConfirmModal
        open={!!deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        message="Məlumatı silməyə əminsinizmi?"
      />

      <ProductDetails product={viewTarget} onClose={() => setViewTarget(null)} />
    </div>
  )
}
