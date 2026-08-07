import { Table, TableEmptyRow } from '@/shared/components/Table'
import Thumbnail from '@/shared/components/Thumbnail'
import ActionMenu from '@/shared/components/ActionMenu'
import type { CategoriesTableProps } from '@/types/category'
import { categoryColumns } from '@/pages/Protected/Categories/table/columns'
import styles from '@/pages/Protected/Categories/styles/CategoriesTable.module.css'

export default function CategoriesTable({ items, page, pageSize, loading, onView, onEdit, onDelete }: CategoriesTableProps) {
  return (
    <Table columns={categoryColumns} minWidth={720}>
      {items.map((item, idx) => (
        <tr key={item.id}>
          <td>{(page - 1) * pageSize + idx + 1}</td>
          <td>
            <Thumbnail imageUrl={item.imageUrl} image={item.image} color={item.color} />
          </td>
          <td className={`truncate ${styles.nameCell}`}>{item.name}</td>
          <td className={`truncate ${styles.descCell}`}>{item.description}</td>
          <td>{item.date}</td>
          <td>
            <ActionMenu onView={() => onView(item)} onEdit={() => onEdit(item)} onDelete={() => onDelete(item)} />
          </td>
        </tr>
      ))}
      {!loading && items.length === 0 && <TableEmptyRow colSpan={categoryColumns.length} />}
    </Table>
  )
}
