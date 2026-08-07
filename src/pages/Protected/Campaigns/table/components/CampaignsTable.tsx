import { Table, TableEmptyRow } from '@/shared/components/Table'
import Thumbnail from '@/shared/components/Thumbnail'
import ActionMenu from '@/shared/components/ActionMenu'
import type { CampaignsTableProps } from '@/types/campaign'
import { campaignColumns } from '@/pages/Protected/Campaigns/table/columns'
import styles from '@/pages/Protected/Campaigns/styles/CampaignsTable.module.css'

export default function CampaignsTable({ items, page, pageSize, loading, onView, onEdit, onDelete }: CampaignsTableProps) {
  return (
    <Table columns={campaignColumns} minWidth={720}>
      {items.map((item, idx) => (
        <tr key={item.id}>
          <td>{(page - 1) * pageSize + idx + 1}</td>
          <td>
            <Thumbnail imageUrl={item.imageUrl} image={item.image} color={item.color} />
          </td>
          <td className={`truncate ${styles.titleCell}`}>{item.title}</td>
          <td className={`truncate ${styles.descCell}`}>{item.description}</td>
          <td>{item.date}</td>
          <td>
            <ActionMenu onView={() => onView(item)} onEdit={() => onEdit(item)} onDelete={() => onDelete(item)} />
          </td>
        </tr>
      ))}
      {!loading && items.length === 0 && <TableEmptyRow colSpan={campaignColumns.length} />}
    </Table>
  )
}
