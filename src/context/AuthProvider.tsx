import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { DEMO_CREDENTIALS, DEMO_USERS } from '@/data'
import type { LoginCredentials, User } from '@/types'
import { readStorage, removeStorage, writeStorage } from '@/utils'
import { AuthContext, type AuthContextValue } from './AuthContext'

const SESSION_KEY = 'app.session'
const FAKE_LATENCY_MS = 600

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => readStorage<User | null>(SESSION_KEY, null))

  const login = useCallback(async ({ username, password }: LoginCredentials) => {
    await new Promise((resolve) => setTimeout(resolve, FAKE_LATENCY_MS))
    const found = DEMO_USERS[username.trim().toLowerCase()]
    if (!found || password !== DEMO_CREDENTIALS.password) return null
    setUser(found)
    writeStorage(SESSION_KEY, found)
    return found
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    removeStorage(SESSION_KEY)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated: user !== null, login, logout }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
