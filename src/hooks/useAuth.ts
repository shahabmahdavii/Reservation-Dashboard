import { AuthContext } from '@/context'
import { useRequiredContext } from './useRequiredContext'

export const useAuth = () => useRequiredContext(AuthContext, 'useAuth')
