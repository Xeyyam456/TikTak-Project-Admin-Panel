import type { IconComponent } from '../common'
import type { OrderStats } from './OrderStats'

export interface OrderStatCardConfig {
  key: keyof OrderStats
  label: string
  icon: IconComponent
  color: string
}
