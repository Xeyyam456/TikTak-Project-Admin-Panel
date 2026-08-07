// Column width constants for productColumns (columns.ts) — pulled into their
// own file since these numbers get tuned back and forth independently of the
// column definitions themselves. Leading 2 ('Sıra'/'Şəkil') and 'Tarix' match
// Campaigns/Categories on request — 5%/5% leading, 10% for 'Tarix' (a +1%
// bump on the leading pair was tried and reverted — it shifted every column
// after it visibly out of alignment with the same columns on Categories/
// Campaigns, which matters more than the extra 1%). 'Əməliyyatlar' matches
// Campaigns/Categories too — bumped from 6% to 8% on request — everything in
// between (5 columns: Ad/Açıqlama/Qiymət/Kateqoriya/Növ) splits the
// remaining 72% equally. Recompute MIDDLE_COUNT by hand if a column is ever
// added/removed from columns.ts.
export const NO_WIDTH = '5%'
export const IMAGE_WIDTH = '5%'
export const DATE_WIDTH = '10%'
export const ACTION_WIDTH = '8%'

const MIDDLE_COUNT = 5
export const MIDDLE_WIDTH = `${(72 / MIDDLE_COUNT).toFixed(2)}%`
