import { Table, TableEmptyRow } from '@/shared/components/Table'
import Thumbnail from '@/shared/components/Thumbnail'
import Badge from '@/shared/components/Badge'
import ActionMenu from '@/shared/components/ActionMenu'
import { PRODUCT_TYPE_LABELS, productTypeBadgeColor } from '@/lib/constants/productTypes'
import type { ProductsTableProps } from '@/types/product'
import { productColumns } from '@/pages/Protected/Products/table/columns'
import styles from '@/pages/Protected/Products/styles/ProductsTable.module.css'

export default function ProductsTable({ items, page, pageSize, loading, onView, onEdit, onDelete }: ProductsTableProps) {
  return (
    
    <div style={{ paddingLeft: 2 }} className="flex flex-col flex-1 min-h-0">
      <Table columns={productColumns} minWidth={880}>
        {items.map((item, idx) => (
          <tr key={item.id}>
            <td>{(page - 1) * pageSize + idx + 1}</td>
            <td>
              <Thumbnail imageUrl={item.imageUrl} image={item.image} color={item.color} />
            </td>
            <td className={`truncate ${styles.nameCell}`}>{item.name}</td>
            <td className={`truncate ${styles.descCell}`}>{item.description}</td>
            <td className={`whitespace-nowrap ${styles.priceCell}`}>{item.price} ₼</td>
            <td className={`truncate ${styles.categoryCell}`}>{item.category?.name ?? ''}</td>
            <td>
              <Badge color={productTypeBadgeColor(item.type)}>{PRODUCT_TYPE_LABELS[item.type] ?? item.type}</Badge>
            </td>
            <td>{item.date}</td>
            <td>
              <ActionMenu onView={() => onView(item)} onEdit={() => onEdit(item)} onDelete={() => onDelete(item)} />
            </td>
          </tr>
        ))}
        {!loading && items.length === 0 && <TableEmptyRow colSpan={productColumns.length} />}
      </Table>
    </div>
  )
}
