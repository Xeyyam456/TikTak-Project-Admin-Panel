import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { ClipboardList, Megaphone, Tags, Package, Users, LogOut } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import ConfirmModal from '@/shared/components/ConfirmModal'
import styles from './Sidebar.module.css'

const navItems = [
  { to: '/sifarisler', label: 'Sifarişlər', icon: ClipboardList },
  { to: '/kampaniyalar', label: 'Kampaniyalar', icon: Megaphone },
  { to: '/kateqoriyalar', label: 'Kateqoriyalar', icon: Tags },
  { to: '/mehsullar', label: 'Məhsullar', icon: Package },
  { to: '/istifadeciler', label: 'İstifadəçilər', icon: Users },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const logout = useAuthStore((s) => s.logout)
  const [confirmOpen, setConfirmOpen] = useState(false)

  return (
    <aside className={`flex flex-col ${styles.aside}`}>
      <nav className={`flex flex-col gap-2 ${styles.nav}`}>
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `flex items-center gap-3 ${styles.link} ${isActive ? styles.linkActive : ''}`}
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>
      <button
        type="button"
        onClick={() => setConfirmOpen(true)}
        className={`flex items-center gap-3 cursor-pointer text-left ${styles.logoutBtn}`}
      >
        <LogOut size={18} />
        Çıxış
      </button>

      <ConfirmModal
        open={confirmOpen}
        message="Hesabdan çıxmaq istədiyinizə əminsiniz?"
        showIcon={false}
        onConfirm={() => {
          setConfirmOpen(false)
          logout()
          toast.success('Hesabdan çıxış edildi')
          navigate('/login')
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </aside>
  )
}
