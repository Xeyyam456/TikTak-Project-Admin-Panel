import type { Column } from '@/types/common'
import { NO_WIDTH, IMAGE_WIDTH, TITLE_WIDTH, DESC_WIDTH, DATE_WIDTH, ACTION_WIDTH } from './widths'

export const campaignColumns: Column[] = [
  { key: 'no', label: 'Sıra', width: NO_WIDTH },
  { key: 'image', label: 'Şəkil', width: IMAGE_WIDTH },
  { key: 'title', label: 'Başlıq', width: TITLE_WIDTH },
  { key: 'desc', label: 'Açıqlama', width: DESC_WIDTH },
  { key: 'date', label: 'Tarix', width: DATE_WIDTH },
  { key: 'action', label: 'Əməliyyatlar', width: ACTION_WIDTH },
]
