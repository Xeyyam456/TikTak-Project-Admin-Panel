import type { SortKey } from './SortKey'

export type SortState = { key: SortKey; dir: 'asc' | 'desc' } | null
