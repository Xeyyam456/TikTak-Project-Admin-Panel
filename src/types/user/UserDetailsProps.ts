import type { User } from './User'

export interface UserDetailsProps {
  user: User | null
  onClose: () => void
}
