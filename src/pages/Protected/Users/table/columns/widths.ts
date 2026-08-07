// Column width constants for userColumns (columns.ts) — pulled into their
// own file since these numbers get tuned back and forth independently of the
// column definitions themselves. First 3 ('Sıra'/'Avatar'/'Ad Soyad') match
// Campaigns/Categories' leading shape on request — 5%/5% for 'Sıra'/'Avatar'
// (the Şəkil-equivalent here), 20% for 'Ad Soyad' (the 3rd column, like
// 'Başlıq'/'Ad' there). 'Rol' was bumped up in five steps
// (80 -> 90 -> 110 -> 130 -> 160 -> 190px) and 'Ünvan' narrowed further
// relative to 'Telefon' on request each time — of what's left after the two
// fixed trailing columns (190+80px), 'Telefon' gets 80% of it and 'Ünvan'
// gets 20%. Recompute REMAINING by hand if 'Rol'/'Əməliyyat' change again or
// a column is added/removed from columns.ts.
export const NO_WIDTH = '5%'
export const AVATAR_WIDTH = '5%'
export const NAME_WIDTH = '20%'
export const ROLE_WIDTH = 190
// Bumped up in two steps (80 -> 90 -> 120px) on request, to give the last
// column ('Əməliyyat') more breathing room on its right side instead of a
// separate table-level padding.
export const ACTION_WIDTH = 120

const FIXED_TOTAL_WIDTH = ROLE_WIDTH + ACTION_WIDTH
export const PHONE_WIDTH = `calc((70% - ${FIXED_TOTAL_WIDTH}px) * 0.8)`
export const ADDRESS_WIDTH = `calc((70% - ${FIXED_TOTAL_WIDTH}px) * 0.2)`
