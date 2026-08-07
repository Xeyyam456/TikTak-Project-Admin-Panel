import type { AuthTokens } from './AuthTokens'
import type { Profile } from './Profile'

export interface LoginResponse {
  tokens: AuthTokens
  profile: Profile
}
