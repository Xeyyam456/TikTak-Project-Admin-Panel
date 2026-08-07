import { Moon, Search, Sun } from 'lucide-react'
import { useThemeStore } from '@/store/useThemeStore'
import type { HeaderProps } from '@/types/shared'
import styles from './Header.module.css'

export default function Header({ search, onSearchChange }: HeaderProps) {
  const { theme, toggleTheme } = useThemeStore()
  const isDark = theme === 'dark'

  return (
    <header className={`gap-4 ${styles.header}`}>
      <h1 className={`whitespace-nowrap ${styles.title}`}>TIK TAK ADMIN</h1>
      <div className={styles.searchWrap}>
        <Search className={styles.searchIcon} size={16} />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder="Axtarış"
          className={styles.searchInput}
        />
      </div>
      <div className={`flex justify-end ${styles.spacer}`}>
        <button
          type="button"
          onClick={toggleTheme}
          className={`flex cursor-pointer ${styles.themeToggle} ${isDark ? styles.themeToggleDark : ''}`}
          role="switch"
          aria-checked={isDark}
          aria-label={isDark ? 'İşıqlı rejimə keç' : 'Qaranlıq rejimə keç'}
        >
          <Sun size={12} className={styles.trackIconSun} />
          <Moon size={12} className={styles.trackIconMoon} />
          <span className={`flex items-center justify-center ${styles.themeToggleThumb}`}>
            {isDark ? <Moon size={13} /> : <Sun size={13} />}
          </span>
        </button>
      </div>
    </header>
  )
}
