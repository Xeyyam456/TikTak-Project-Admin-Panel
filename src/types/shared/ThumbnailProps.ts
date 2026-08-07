import type { ReactNode } from 'react'

export interface ThumbnailProps {
  imageUrl?: string
  image?: ReactNode
  color?: string
  size?: 'sm' | 'lg'
}
