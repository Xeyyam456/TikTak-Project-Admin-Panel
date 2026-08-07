import type { ReactNode } from 'react'

export interface Column {
  key: string
  label: ReactNode
  width?: number | string
  // Overrides the shared Table's default first-column centering (see
  // Table.module.css) for a specific column — unset everywhere except
  // Orders' "No" column, which needs to stay left-aligned.
  align?: 'left' | 'center' | 'right'
}
