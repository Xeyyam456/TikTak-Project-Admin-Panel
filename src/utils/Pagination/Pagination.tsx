import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import type { PaginationProps } from '@/types/shared'
import styles from './Pagination.module.css'

const PAGE_SIZE_OPTIONS = [5, 10, 20]

export default function Pagination({ page, pageSize, total, onPageChange, onPageSizeChange }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(total, page * pageSize)

  const pageNumbers: (number | '...')[] = []
  for (let p = 1; p <= totalPages; p += 1) {
    if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) {
      pageNumbers.push(p)
    } else if (pageNumbers[pageNumbers.length - 1] !== '...') {
      pageNumbers.push('...')
    }
  }

  return (
    <div className={`flex flex-wrap items-center justify-end gap-4 ${styles.wrap}`}>
      <span>
        {start}-{end} / {total} nəticə
      </span>
      <div className={`flex items-center gap-1 ${styles.pages}`}>
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className={`flex items-center justify-center cursor-pointer ${styles.navBtn}`}
        >
          <ChevronLeft size={16} />
        </button>
        {pageNumbers.map((p, idx) =>
          p === '...' ? (
            <span key={`dots-${idx}`} className={styles.dots}>
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={`flex items-center justify-center cursor-pointer ${styles.pageBtn} ${p === page ? styles.pageBtnActive : ''}`}
            >
              {p}
            </button>
          ),
        )}
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className={`flex items-center justify-center cursor-pointer ${styles.navBtn}`}
        >
          <ChevronRight size={16} />
        </button>
      </div>
      {onPageSizeChange && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button type="button" className={`flex items-center gap-1 cursor-pointer ${styles.pageSize}`}>
              {pageSize} - page
              <ChevronDown size={14} />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content align="end" sideOffset={4} className={styles.pageSizeMenu}>
              {PAGE_SIZE_OPTIONS.map((size) => (
                <DropdownMenu.Item
                  key={size}
                  onSelect={() => onPageSizeChange(size)}
                  className={`cursor-pointer ${styles.pageSizeItem} ${size === pageSize ? styles.pageSizeItemActive : ''}`}
                >
                  {size} - page
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      )}
    </div>
  )
}
