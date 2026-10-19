import type { User } from '@/types'

export const DEMO_CREDENTIALS = {
  username: 'admin@example.com',
  password: 'admin123',
} as const

export const DEMO_USERS: Record<string, User> = {
  'admin@example.com': { username: 'admin@example.com', displayName: 'Admin' },
  admin: { username: 'admin', displayName: 'Admin' },
}
