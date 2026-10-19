import { useTranslation } from 'react-i18next'
import type { ReservationStatus } from '@/types'
import { cn, STATUS_STYLES } from '@/utils'

export function StatusBadge({ status }: { status: ReservationStatus }) {
  const { t } = useTranslation()
  const style = STATUS_STYLES[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ring-1 ring-inset',
        style.badge,
      )}
    >
      <span className={cn('size-1.5 rounded-full', style.dot)} />
      {t(`reservation.status.${status}`)}
    </span>
  )
}
