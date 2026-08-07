// Column width constants for campaignColumns (columns.ts) — pulled into their
// own file since these numbers get tuned back and forth independently of the
// column definitions themselves. Leading 2 ('Sıra'/'Şəkil') get 5% each and
// 'Tarix' gets 10% (on request). 'Başlıq' (3rd column) was reduced further on
// request to 20%, leaving 'Açıqlama' the rest. Last column 'Əməliyyatlar' was
// reduced to 6% (in two steps), then bumped back up slightly to 8% on
// request — 'Açıqlama' gave up the matching 2%.
export const NO_WIDTH = '5%'
export const IMAGE_WIDTH = '5%'
export const TITLE_WIDTH = '20%'
export const DESC_WIDTH = '48%'
export const DATE_WIDTH = '10%'
export const ACTION_WIDTH = '8%'
