import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ChevronDown } from 'lucide-react'
import type { FormDropdownProps } from '@/types/shared'
import styles from './FormDropdown.module.css'

export default function FormDropdown({ value, onChange, options, placeholder = 'Seçin' }: FormDropdownProps) {
  const selected = options.find((o) => o.value === value)

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button type="button" className={`flex items-center justify-between ${styles.trigger}`}>
          <span className={selected ? '' : styles.placeholder}>{selected?.label ?? placeholder}</span>
          <ChevronDown size={16} className={styles.chevron} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={4}
          className={styles.menu}
          style={{ width: 'var(--radix-dropdown-menu-trigger-width)' }}
        >
          {options.map((o) => (
            <DropdownMenu.Item
              key={o.value}
              onSelect={() => onChange(o.value)}
              className={`cursor-pointer ${styles.item} ${o.value === value ? styles.itemActive : ''}`}
            >
              {o.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
