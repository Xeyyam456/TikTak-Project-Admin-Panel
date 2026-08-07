// '10+' reads as "more than 10" (common bucket-label convention) — it still
// matches count >= 11 under the hood, so it stays disjoint from '6-10' rather
// than overlapping at 10. See table/filters.ts's matchesCountBucket for the
// actual matching logic.
export type CountBucket = '1-5' | '6-10' | '10+'
