export const USER_ROLE_LABELS = {
  ADMIN: 'Admin',
  COMMERCE: 'Müştəri',
} as const

export type UserRole = keyof typeof USER_ROLE_LABELS
