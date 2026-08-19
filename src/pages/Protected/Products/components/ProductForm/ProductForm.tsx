import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Modal from '@/shared/components/Modal'
import Button from '@/shared/components/Button'
import FormField from '@/shared/components/FormField'
import FormInput from '@/shared/components/FormInput'
import FormTextarea from '@/shared/components/FormTextarea'
import FormSelect from '@/shared/components/FormSelect'
import ImageUploadField from '@/shared/components/ImageUploadField'
import { PRODUCT_TYPE_LABELS, PRODUCT_TYPE_OPTIONS } from '@/lib/constants/productTypes'
import type { ProductForm as ProductFormValues, ProductFormProps } from '@/types/product'
import styles from '@/pages/Protected/Products/styles/ProductForm.module.css'

export default function ProductForm({ open, onClose, editing, defaultValues, submitting, categoryOptions, onSubmit }: ProductFormProps) {
  const { register, handleSubmit, reset, watch, setValue } = useForm<ProductFormValues>({ defaultValues })

  // react-hook-form only reads `defaultValues` once, on mount — reset it
  // explicitly whenever the modal (re)opens so switching between "create" and
  // "edit <item>" (or between two different items) doesn't reuse stale values.
  useEffect(() => {
    if (open) reset(defaultValues)
  }, [open, defaultValues, reset])

  return (
    <Modal open={open} onClose={onClose} wide>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField label="Şəkil">
          <ImageUploadField value={watch('imageUrl')} onChange={(url) => setValue('imageUrl', url, { shouldDirty: true })} />
        </FormField>
        <FormField label="Ad">
          <FormInput {...register('name', { required: true })} />
        </FormField>
        <FormField label="Açıqlama">
          <FormTextarea rows={2} {...register('description', { required: true })} />
        </FormField>
        <div className={`gap-4 ${styles.row}`}>
          <FormField label="Qiymət">
            <FormInput type="number" step="0.01" {...register('price', { required: true })} />
          </FormField>
          <FormField label="Növ">
            <FormSelect {...register('type')}>
              {PRODUCT_TYPE_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {PRODUCT_TYPE_LABELS[t]}
                </option>
              ))}
            </FormSelect>
          </FormField>
        </div>
        <FormField label="Kateqoriya">
          <FormSelect {...register('category_id', { required: true })}>
            {categoryOptions.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </FormSelect>
        </FormField>
        <Button type="submit" fullWidth className={styles.submitBtn} disabled={submitting}>
          {submitting ? 'Göndərilir...' : editing ? 'Məlumatları yenilə' : 'Məlumatları yarat'}
        </Button>
      </form>
    </Modal>
  )
}
