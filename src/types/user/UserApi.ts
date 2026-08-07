import type { UserRole } from '@/lib/constants/userRole'

export interface UserApi {
  id: number
  full_name: string
  phone: string
  address: string | null
  img_url: string | null
  role: UserRole
  created_at: string
}
