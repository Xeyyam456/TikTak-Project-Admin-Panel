import { useEffect, useRef, useState } from 'react'

// Shared open/position/outside-click-close behavior behind DateColumnHeader's
// portal — same createPortal pattern as ActionMenu, since table cells sit
// inside a scroll container that would otherwise clip an absolutely-positioned
// dropdown. ColumnHeader uses Radix's DropdownMenu instead and doesn't need this.
export function useColumnMenu(menuWidth: number) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const openMenu = () => {
    const rect = triggerRef.current!.getBoundingClientRect()
    setPos({ top: rect.bottom + 4, left: Math.max(8, rect.right - menuWidth) })
    setOpen(true)
  }

  useEffect(() => {
    if (!open) return undefined

    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as Node
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) return
      setOpen(false)
    }
    const handleScroll = () => setOpen(false)

    document.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('scroll', handleScroll, true)
    window.addEventListener('resize', handleScroll)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('scroll', handleScroll, true)
      window.removeEventListener('resize', handleScroll)
    }
  }, [open])

  return { open, setOpen, pos, triggerRef, menuRef, openMenu }
}
