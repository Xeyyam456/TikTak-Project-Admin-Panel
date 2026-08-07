import type { BadgeColor } from '@/types/common'

// ORDER_STATUS_BADGE_COLOR values are BadgeColor keys (e.g. 'amber'), not real CSS
// colors — 'amber' isn't a valid CSS color keyword, so it can't be passed straight
// into a `style={{ color }}`. Map each key to the same CSS var Badge.module.css uses.
// Also reused as the OrderDetails status dot's *background* (with white text on
// top) — these are the same saturated colors already used for the status
// `<select>`'s border/text, so reusing them keeps the dot color-matched to the
// select instead of introducing a second, separate color scale.
export const STATUS_TEXT_COLOR: Record<BadgeColor, string> = {
  amber: 'var(--color-amber-text)',
  blue: 'var(--color-blue-text)',
  green: 'var(--color-green-dark)',
  red: 'var(--color-red-text)',
  purple: 'var(--color-purple-text)',
}
