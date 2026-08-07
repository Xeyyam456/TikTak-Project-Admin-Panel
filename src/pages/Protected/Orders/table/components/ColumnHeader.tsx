import { useState } from 'react'
import { Filter, Check, Search } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import type { ColumnHeaderProps } from '@/types/order'
import { SortTrigger } from '@/pages/Protected/Orders/table/components/SortTrigger'
import styles from '@/pages/Protected/Orders/styles/OrdersTable.module.css'


export function ColumnHeader<T extends string>({
  label,
  options,
  getOptionLabel = (option) => option,
  value,
  onChange,
  sortDir,
  onSortClick,
  centered,
}: ColumnHeaderProps<T>) {

  const [search, setSearch] = useState('')
  const filteredOptions = options.filter((option) =>
    getOptionLabel(option).toLocaleLowerCase('az').includes(search.toLocaleLowerCase('az')),
  )

  const toggle = (option: T) => {
    const next = new Set(value)
    if (next.has(option)) next.delete(option)
    else next.add(option)
    onChange(next)
  }

  return (
    <span className={`flex items-center gap-2 ${centered ? `justify-center ${styles.colLabelCentered}` : ''} ${styles.colLabel}`}>
      {label}
      <span className="flex items-center gap-1">
        <SortTrigger label={label} sortDir={sortDir} onClick={onSortClick} />
        <DropdownMenu.Root onOpenChange={(next) => !next && setSearch('')}>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              className={`cursor-pointer ${styles.filterTrigger} ${value.size > 0 ? styles.filterActive : ''}`}
              aria-label={`${label} filtri`}
            >
              <Filter size={16} />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={4}
              className={`flex flex-col gap-0.5 ${styles.filterMenu}`}
            >
              <div className={`flex items-center ${styles.filterSearchWrap}`}>
                <Search size={13} className={styles.filterSearchIcon} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.stopPropagation()}
                  placeholder="Axtar..."
                  className={styles.filterSearchInput}
                />
              </div>
              {filteredOptions.length === 0 && <div className={styles.filterEmpty}>Seçim yoxdur</div>}
              {filteredOptions.map((option) => (
                <DropdownMenu.CheckboxItem
                  key={option}
                  checked={value.has(option)}
                  onCheckedChange={() => toggle(option)}
                  onSelect={(e) => e.preventDefault()}
                  className={`flex items-center gap-2 cursor-pointer ${styles.filterItem}`}
                >
                  <span className={`flex items-center justify-center ${styles.checkbox} ${value.has(option) ? styles.checkboxChecked : ''}`}>
                    {value.has(option) && <Check size={11} strokeWidth={3} />}
                  </span>
                  <span className="truncate">{getOptionLabel(option)}</span>
                </DropdownMenu.CheckboxItem>
              ))}
              {value.size > 0 && (
                <DropdownMenu.Item
                  onSelect={() => onChange(new Set())}
                  className={`cursor-pointer text-left ${styles.filterClear}`}
                >
                  Təmizlə
                </DropdownMenu.Item>
              )}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </span>
    </span>
  )
}
