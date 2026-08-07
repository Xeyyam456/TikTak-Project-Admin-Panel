import type { Column } from '@/types/common'
import { NO_WIDTH, AVATAR_WIDTH, NAME_WIDTH, PHONE_WIDTH, ADDRESS_WIDTH, ROLE_WIDTH, ACTION_WIDTH } from './widths'

export const userColumns: Column[] = [
  { key: 'no', label: 'Sıra', width: NO_WIDTH },
  { key: 'avatar', label: 'Avatar', width: AVATAR_WIDTH },
  { key: 'name', label: 'Ad Soyad', width: NAME_WIDTH },
  { key: 'phone', label: 'Telefon', width: PHONE_WIDTH },
  { key: 'address', label: 'Ünvan', width: ADDRESS_WIDTH },
  { key: 'role', label: 'Rol', width: ROLE_WIDTH },
  { key: 'action', label: 'Əməliyyat', width: ACTION_WIDTH },
]
