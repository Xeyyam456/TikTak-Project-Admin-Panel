import '@tanstack/react-table'

// Table's shared shell (Column.width) only knows px/% — piggyback the same
// field onto tanstack's own per-column meta instead of inventing a second one.
declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    width?: number | string
  }
}
