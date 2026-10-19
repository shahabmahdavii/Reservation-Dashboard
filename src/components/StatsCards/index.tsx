import { useMemo, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '@/hooks'
import { RESERVATION_STATUSES, type Reservation, type StatusFilter } from '@/types'
import { cn, localizeDigits, STATUS_STYLES } from '@/utils'
import { CheckCircleIcon, CheckIcon, HourglassIcon, ListIcon, XCircleIcon } from '../Icons'

const ICONS: Record<StatusFilter, ReactNode> = {
  all: <ListIcon />,
  pending: <HourglassIcon />,
  confirmed: <CheckIcon />,
  completed: <CheckCircleIcon />,
  cancelled: <XCircleIcon />,
}

interface StatsCardsProps {
  reservations: Reservation[]
  activeFilter: StatusFilter
  onSelect: (filter: StatusFilter) => void
}

export function StatsCards({ reservations, activeFilter, onSelect }: StatsCardsProps) {
  const { t } = useTranslation()
  const { language } = useLanguage()

  const counts = useMemo(() => {
    const result: Record<StatusFilter, number> = {
      all: reservations.length,
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
    }
    for (const r of reservations) result[r.status]++
    return result
  }, [reservations])

  const items: StatusFilter[] = ['all', ...RESERVATION_STATUSES]

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-5">
      {items.map((key) => {
        const isActive = activeFilter === key
        return (
          <button
            key={key}
            type="button"
            onClick={() => onSelect(key)}
            aria-pressed={isActive}
            className={cn(
              'group flex cursor-pointer items-center gap-3 rounded-2xl border bg-white p-4 text-start transition-all hover:-translate-y-0.5 hover:shadow-md',
              isActive ? 'border-brand-500 ring-4 ring-brand-100' : 'border-slate-200/80',
              key === 'all' && 'col-span-2 md:col-span-1',
            )}
          >
            <span
              className={cn(
                'grid size-11 shrink-0 place-items-center rounded-xl',
                key === 'all' ? 'bg-brand-50 text-brand-600' : STATUS_STYLES[key].card,
              )}
            >
              {ICONS[key]}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-xs text-slate-500 sm:text-sm">
                {t(key === 'all' ? 'dashboard.stats.total' : `dashboard.stats.${key}`)}
              </span>
              <span className="block text-2xl font-bold text-slate-900">
                {localizeDigits(counts[key], language)}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
