import type { ReactNode } from 'react'
import type { BadgeColor } from '../common'

export interface BadgeProps {
  color?: BadgeColor
  children: ReactNode
}
