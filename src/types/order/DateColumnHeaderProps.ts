export interface DateColumnHeaderProps {
  label: string
  value: string
  onChange: (next: string) => void
  sortDir?: 'asc' | 'desc' | null
  onSortClick?: () => void
}
