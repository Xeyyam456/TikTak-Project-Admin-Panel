import type { ReactNode } from 'react'
import type { IconComponent } from '../common'

export interface StatCardProps {
  label: ReactNode
  value: ReactNode
  icon: IconComponent
  color: string
}
