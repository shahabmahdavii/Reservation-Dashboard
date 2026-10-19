import { ToastContext } from '@/context'
import { useRequiredContext } from './useRequiredContext'

export const useToast = () => useRequiredContext(ToastContext, 'useToast')
