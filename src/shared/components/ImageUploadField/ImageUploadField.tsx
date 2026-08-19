import { useRef, type ChangeEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Upload, Trash2 } from 'lucide-react'
import Button from '@/shared/components/Button'
import FormInput from '@/shared/components/FormInput'
import { uploadImage } from '@/services/uploadService'
import { compressImage } from '@/utils/CompressImage'
import { resizeThumbnailUrl } from '@/utils/ResizeThumbnailUrl'
import type { ImageUploadFieldProps } from '@/types/shared'
import styles from './ImageUploadField.module.css'

export default function ImageUploadField({ value, onChange }: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Yükləmə gedərkən inputda faylın lokal adı görünmür — yalnız yükləmə
  // bitəndə server-in qaytardığı əsl link `onChange`-lə yazılır.
  const { mutate, isPending } = useMutation({
    mutationFn: async (file: File) => uploadImage(await compressImage(file)),
    onSuccess: (data) => onChange(data.url),
  })

  const handlePick = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) mutate(file)
    e.target.value = ''
  }

  return (
    <div className={`flex flex-col items-center ${styles.wrap}`}>
      {value && (
        <div className={`flex items-center justify-center ${styles.preview}`}>
          <img src={resizeThumbnailUrl(value, 160)} alt="" width={80} height={80} className={styles.previewImg} loading="lazy" decoding="async" />
        </div>
      )}
      <div className={`flex items-center w-full ${styles.inputWrap}`}>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePick} hidden />
        <Button
          type="button"
          variant="ghost"
          icon={Upload}
          iconSize={15}
          onClick={() => fileInputRef.current?.click()}
          disabled={isPending}
          className={styles.leadingIconBtn}
        >
          Yüklə
        </Button>
        <FormInput
          placeholder={isPending ? 'Yüklənir...' : 'https://...'}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          disabled={isPending}
          readOnly={!!value}
          className={`${styles.hasLeadingIcon} ${value ? styles.hasTrailingIcon : ''}`}
        />
        {/* `isPending` trash-ı gizlətmir, sadəcə `disabled` edir — mount/unmount
            olmasın, yoxsa mövcud link üstündən yenisini seçəndə bir anlıq yox olub
            yenidən görünürdü. */}
        {value && (
          <Button
            type="button"
            variant="ghost"
            icon={Trash2}
            iconSize={16}
            onClick={() => onChange('')}
            disabled={isPending}
            className={styles.trailingIconBtn}
            aria-label="Şəkli sil"
          />
        )}
      </div>
    </div>
  )
}
