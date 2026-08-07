import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Loading from '@/shared/components/Loading'
import { useTitle } from '@/shared/hooks/useTitle'
import UserDetails from './components/UserDetails'
import UsersTable from './table'
import UsersPagination from './pagination'
import { useUsersData } from './queries'
import type { LayoutOutletContext } from '@/types/common'
import type { User } from '@/types/user'
import styles from '@/pages/Protected/Users/styles/Users.module.css'

export default function Users() {
  useTitle('İstifadəçilər')
  const { search } = useOutletContext<LayoutOutletContext>()
  const { loading, filtered, page, setPage, pageSize, paged } = useUsersData(search)
  const [selected, setSelected] = useState<User | null>(null)




  return (
    <div>
      <div className={`flex items-center ${styles.headerRow}`}>
        <h2 className={styles.heading}>İstifadəçilər</h2>
      </div>

      {loading && <Loading />}

      <UsersTable items={paged} page={page} pageSize={pageSize} loading={loading} onView={setSelected} />

      <UsersPagination page={page} pageSize={pageSize} total={filtered.length} onPageChange={setPage} />

      <UserDetails user={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
