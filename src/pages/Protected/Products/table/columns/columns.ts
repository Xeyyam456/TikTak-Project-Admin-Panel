import type { Column } from '@/types/common'
import { NO_WIDTH, IMAGE_WIDTH, MIDDLE_WIDTH, DATE_WIDTH, ACTION_WIDTH } from './widths'

export const productColumns: Column[] = [
  { key: 'no', label: 'Sıra', width: NO_WIDTH },
  { key: 'image', label: 'Şəkil', width: IMAGE_WIDTH },
  { key: 'name', label: 'Ad', width: MIDDLE_WIDTH },
  { key: 'desc', label: 'Açıqlama', width: MIDDLE_WIDTH },
  { key: 'price', label: 'Qiymət', width: MIDDLE_WIDTH },
  { key: 'category', label: 'Kateqoriya', width: MIDDLE_WIDTH },
  { key: 'type', label: 'Növ', width: MIDDLE_WIDTH },
  { key: 'date', label: 'Tarix', width: DATE_WIDTH },
  { key: 'action', label: 'Əməliyyatlar', width: ACTION_WIDTH },
]
