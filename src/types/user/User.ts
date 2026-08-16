import type { UserRole } from '@/lib/constants/userRole'

export interface User {
  id: number
  initial: string
  color: string
  imageUrl: string | null
  name: string
  phone: string
  address: string
  role: UserRole
}
