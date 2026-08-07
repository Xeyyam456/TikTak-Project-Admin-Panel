import type { ReactNode } from 'react'
import type { Column } from '../common'

export interface TableProps {
  columns: Column[]
  minWidth?: number
  children?: ReactNode
}
