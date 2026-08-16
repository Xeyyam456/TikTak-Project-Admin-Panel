import { Eye, Phone } from 'lucide-react'
import { Table, TableEmptyRow } from '@/shared/components/Table'
import Button from '@/shared/components/Button'
import { USER_ROLE_LABELS } from '@/lib/constants/userRole'
import { resizeThumbnailUrl } from '@/utils/ResizeThumbnailUrl'
import type { UsersTableProps } from '@/types/user'
import { userColumns } from '@/pages/Protected/Users/table/columns'
import styles from '@/pages/Protected/Users/styles/UsersTable.module.css'

export default function UsersTable({ items, page, pageSize, loading, onView }: UsersTableProps) {
  return (
    <Table columns={userColumns} minWidth={760}>
      {items.map((user, idx) => (
        <tr key={user.id}>
          <td>{(page - 1) * pageSize + idx + 1}</td>
          <td>
            <span className={`flex items-center justify-center overflow-hidden ${styles.avatar}`} style={{ backgroundColor: user.color }}>
              {user.imageUrl ? (
                <img
                  src={resizeThumbnailUrl(user.imageUrl, 80)}
                  alt=""
                  width={40}
                  height={40}
                  loading="lazy"
                  decoding="async"
                  className={styles.avatarImg}
                />
              ) : (
                user.initial
              )}
            </span>
          </td>
          <td className={styles.nameCell}>{user.name}</td>
          <td>
            <span className={`flex items-center gap-1.5 ${styles.phoneCell}`}>
              <Phone size={13} /> {user.phone}
            </span>
          </td>
          <td className={styles.addressCell}>{user.address}</td>
          <td>
            <span className={`inline-flex items-center ${styles.roleBadge}`}>{USER_ROLE_LABELS[user.role] ?? user.role}</span>
          </td>
          <td>
            <Button variant="ghost" icon={Eye} iconSize={15} onClick={() => onView(user)}>
              Göstər
            </Button>
          </td>
        </tr>
      ))}
      {!loading && items.length === 0 && <TableEmptyRow colSpan={userColumns.length} />}
    </Table>
  )
}
