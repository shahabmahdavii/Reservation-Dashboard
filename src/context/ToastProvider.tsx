import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import { ToastContainer } from '@/components'
import type { Toast, ToastVariant } from '@/types'
import { ToastContext } from './ToastContext'

const TOAST_DURATION_MS = 3500

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const nextId = useRef(0)

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const notify = useCallback(
    (message: string, variant: ToastVariant = 'success') => {
      const id = ++nextId.current
      setToasts((current) => [...current, { id, message, variant }])
      setTimeout(() => dismiss(id), TOAST_DURATION_MS)
    },
    [dismiss],
  )

  const value = useMemo(() => ({ notify }), [notify])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  )
}
