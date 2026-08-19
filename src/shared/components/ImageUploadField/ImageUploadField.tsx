import { useRef, type ChangeEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Upload, X } from 'lucide-react'
import Thumbnail from '@/shared/components/Thumbnail'
import Button from '@/shared/components/Button'
import { uploadImage } from '@/services/uploadService'
import { compressImage } from '@/utils/CompressImage'
import type { ImageUploadFieldProps } from '@/types/shared'
import styles from './ImageUploadField.module.css'

export default function ImageUploadField({ value, onChange }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  // Şəkil birbaşa formanın öz body-sinə (base64/binary) getmir — əvvəlcə
  // ayrıca `/upload`-a göndərilir, forma yalnız qayıdan linki (`url`) saxlayır.
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
    <div className={`flex items-center gap-3 ${styles.wrap}`}>
      <Thumbnail imageUrl={value} size="lg" />
      <input ref={inputRef} type="file" accept="image/*" onChange={handlePick} hidden />
      <Button type="button" variant="outline" icon={Upload} onClick={() => inputRef.current?.click()} disabled={isPending}>
        {isPending ? 'Yüklənir...' : 'Şəkil seç'}
      </Button>
      {value && !isPending && (
        <Button type="button" variant="ghostDanger" icon={X} onClick={() => onChange('')}>
          Sil
        </Button>
      )}
    </div>
  )
}
