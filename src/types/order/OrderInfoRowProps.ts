import type { IconComponent } from '@/types/common'

export type OrderInfoRowColor = 'blue' | 'amber' | 'purple' | 'green'

export interface OrderInfoRowProps {
  icon: IconComponent
  color: OrderInfoRowColor
  label: string
  value: string
}
