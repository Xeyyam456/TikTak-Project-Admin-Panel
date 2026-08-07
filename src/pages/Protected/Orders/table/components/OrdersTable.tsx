import { flexRender } from '@tanstack/react-table'
import { Table, TableEmptyRow } from '@/shared/components/Table'
import type { OrdersTableProps } from '@/types/order'

export default function OrdersTable({ columns, rows, loading }: OrdersTableProps) {
  return (
    <Table columns={columns} minWidth={950}>
      {rows.map((row) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id} style={cell.column.id === 'no' ? { textAlign: 'left' } : undefined}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
      {!loading && rows.length === 0 && <TableEmptyRow colSpan={columns.length} />}
    </Table>
  )
}
