import { createContext } from 'react'
import type { ToastVariant } from '@/types'

export interface ToastContextValue {
  notify: (message: string, variant?: ToastVariant) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)
