import { create } from 'zustand'
import type { Theme, ThemeState } from '@/types/theme'

const STORAGE_KEY = 'admin-theme'

// No stored preference yet on first visit — fall back to the OS/browser's
// own light/dark setting instead of always defaulting to light.
const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'dark' : 'light'
}

// `data-theme` on <html> is what index.css's `:root[data-theme='dark']`
// override block keys off — the CSS custom properties, not React, own the
// actual color swap.
const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem(STORAGE_KEY, theme)
}

export const useThemeStore = create<ThemeState>((set, get) => {
  const initial = getInitialTheme()
  applyTheme(initial)

  return {
    theme: initial,
    toggleTheme: () => {
      const next: Theme = get().theme === 'light' ? 'dark' : 'light'
      applyTheme(next)
      set({ theme: next })
    },
  }
})
