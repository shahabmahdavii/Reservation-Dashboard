import { createContext } from 'react'
import type { LoginCredentials, User } from '@/types'

export interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<User | null>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
