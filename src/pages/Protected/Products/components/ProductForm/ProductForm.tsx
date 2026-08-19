import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Modal from '@/shared/components/Modal'
import Button from '@/shared/components/Button'
import FormField from '@/shared/components/FormField'
import FormInput from '@/shared/components/FormInput'
import FormTextarea from '@/shared/components/FormTextarea'
import FormDropdown from '@/shared/components/FormDropdown'
import ImageUploadField from '@/shared/components/ImageUploadField'
import { PRODUCT_TYPE_LABELS, PRODUCT_TYPE_OPTIONS } from '@/lib/constants/productTypes'
import type { ProductForm as ProductFormValues, ProductFormProps } from '@/types/product'
import styles from '@/pages/Protected/Products/styles/ProductForm.module.css'

const TYPE_OPTIONS = PRODUCT_TYPE_OPTIONS.map((t) => ({ value: t, label: PRODUCT_TYPE_LABELS[t] }))

export default function ProductForm({ open, onClose, editing, defaultValues, submitting, categoryOptions, onSubmit }: ProductFormProps) {
  const { register, handleSubmit, reset, watch, setValue, control } = useForm<ProductFormValues>({ defaultValues })

  // react-hook-form only reads `defaultValues` once, on mount — reset it
  // explicitly whenever the modal (re)opens so switching between "create" and
  // "edit <item>" (or between two different items) doesn't reuse stale values.
  useEffect(() => {
    if (open) reset(defaultValues)
  }, [open, defaultValues, reset])

  return (
    <Modal open={open} onClose={onClose} wide>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <ImageUploadField value={watch('imageUrl')} onChange={(url) => setValue('imageUrl', url, { shouldDirty: true })} />
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
            <Controller
              control={control}
              name="type"
              render={({ field }) => <FormDropdown value={field.value} onChange={field.onChange} options={TYPE_OPTIONS} />}
            />
          </FormField>
        </div>
        <FormField label="Kateqoriya">
          <Controller
            control={control}
            name="category_id"
            rules={{ required: true }}
            render={({ field }) => (
              <FormDropdown
                value={String(field.value)}
                onChange={field.onChange}
                options={categoryOptions.map((c) => ({ value: String(c.id), label: c.name }))}
                placeholder="Kateqoriya seçin"
              />
            )}
          />
        </FormField>
        <Button type="submit" fullWidth className={styles.submitBtn} disabled={submitting}>
          {submitting ? 'Göndərilir...' : editing ? 'Məlumatları yenilə' : 'Məlumatları yarat'}
        </Button>
      </form>
    </Modal>
  )
}
