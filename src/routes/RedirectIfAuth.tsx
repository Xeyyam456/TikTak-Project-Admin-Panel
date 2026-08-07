import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import type { RedirectIfAuthProps } from '@/types/shared'

export default function RedirectIfAuth({ children }: RedirectIfAuthProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  return isAuthenticated ? <Navigate to="/sifarisler" replace /> : children
}
