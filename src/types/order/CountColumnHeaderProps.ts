export interface CountColumnHeaderProps {
  label: string
  onChange: (next: string) => void
  sortDir?: 'asc' | 'desc' | null
  onSortClick?: () => void
  centered?: boolean
}
