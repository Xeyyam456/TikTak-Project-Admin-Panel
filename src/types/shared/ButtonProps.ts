import type { ComponentPropsWithRef } from 'react'
import type { IconComponent } from '../common'

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: 'solid' | 'outline' | 'ghost' | 'ghostDanger'
  icon?: IconComponent
  iconSize?: number
  fullWidth?: boolean
  block?: boolean
}
