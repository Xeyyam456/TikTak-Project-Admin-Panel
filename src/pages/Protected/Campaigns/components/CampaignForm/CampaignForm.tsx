import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Modal from '@/shared/components/Modal'
import Button from '@/shared/components/Button'
import FormField from '@/shared/components/FormField'
import FormInput from '@/shared/components/FormInput'
import FormTextarea from '@/shared/components/FormTextarea'
import ImageUploadField from '@/shared/components/ImageUploadField'
import type { CampaignForm as CampaignFormValues, CampaignFormProps } from '@/types/campaign'
import styles from '@/pages/Protected/Campaigns/styles/CampaignForm.module.css'

export default function CampaignForm({ open, onClose, editing, defaultValues, submitting, onSubmit }: CampaignFormProps) {
  const { register, handleSubmit, reset, watch, setValue } = useForm<CampaignFormValues>({ defaultValues })

  // react-hook-form only reads `defaultValues` once, on mount — reset it
  // explicitly whenever the modal (re)opens so switching between "create" and
  // "edit <item>" (or between two different items) doesn't reuse stale values.
  useEffect(() => {
    if (open) reset(defaultValues)
  }, [open, defaultValues, reset])

  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <ImageUploadField value={watch('imageUrl')} onChange={(url) => setValue('imageUrl', url, { shouldDirty: true })} />
        <FormField label="Başlıq">
          <FormInput {...register('title', { required: true })} />
        </FormField>
        <FormField label="Açıqlama">
          <FormTextarea rows={3} {...register('description', { required: true })} />
        </FormField>
        <Button type="submit" fullWidth className={styles.submitBtn} disabled={submitting}>
          {submitting ? 'Göndərilir...' : editing ? 'Məlumatları yenilə' : 'Məlumatları yarat'}
        </Button>
      </form>
    </Modal>
  )
}
