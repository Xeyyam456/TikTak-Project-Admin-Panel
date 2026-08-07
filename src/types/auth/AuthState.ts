import type { Profile } from './Profile'

export interface AuthState {
  profile: Profile | null
  isAuthenticated: boolean
  login: (phone: string, password: string) => Promise<void>
  logout: () => void
}
