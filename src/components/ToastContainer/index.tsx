import { useTranslation } from 'react-i18next'
import type { Toast, ToastVariant } from '@/types'
import { cn } from '@/utils'
import { AlertIcon, CheckCircleIcon, CloseIcon, InfoIcon } from '../Icons'

const STYLES: Record<ToastVariant, { box: string; Icon: typeof InfoIcon }> = {
  success: { box: 'border-emerald-200 bg-emerald-50 text-emerald-800', Icon: CheckCircleIcon },
  error: { box: 'border-rose-200 bg-rose-50 text-rose-800', Icon: AlertIcon },
  info: { box: 'border-sky-200 bg-sky-50 text-sky-800', Icon: InfoIcon },
}

interface ToastContainerProps {
  toasts: Toast[]
  onDismiss: (id: number) => void
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  const { t } = useTranslation()
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 top-4 z-50 flex flex-col items-center gap-2 sm:inset-s-auto sm:inset-e-6 sm:items-end"
    >
      {toasts.map(({ id, message, variant }) => {
        const { box, Icon } = STYLES[variant]
        return (
          <div
            key={id}
            role={variant === 'error' ? 'alert' : 'status'}
            className={cn(
              'pointer-events-auto flex w-full max-w-sm animate-slide-up items-start gap-3 rounded-2xl border px-4 py-3 text-sm shadow-lg',
              box,
            )}
          >
            <Icon className="mt-0.5 shrink-0" />
            <p className="flex-1">{message}</p>
            <button
              type="button"
              onClick={() => onDismiss(id)}
              className="cursor-pointer opacity-60 transition-opacity hover:opacity-100"
              aria-label={t('common.close')}
            >
              <CloseIcon width={16} height={16} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
