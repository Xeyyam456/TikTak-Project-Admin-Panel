export interface ColumnHeaderProps<T extends string> {
  label: string
  options: readonly T[]
  getOptionLabel?: (option: T) => string
  value: Set<T>
  onChange: (next: Set<T>) => void
  sortDir?: 'asc' | 'desc' | null
  onSortClick?: () => void
  // Centers the label + sort/filter icons as one unit within the header
  // cell instead of the default left alignment — only `Məhsul sayı` uses
  // this, on request, since a `<th>`'s own `text-align` doesn't affect this
  // component's root `<span>` (a block-level flex container, unaffected by
  // an ancestor's text-align).
  centered?: boolean
}
