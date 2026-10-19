import { useTranslation } from 'react-i18next'
import { RESERVATION_STATUSES, type StatusFilter } from '@/types'
import { cn } from '@/utils'
import { CloseIcon, SearchIcon } from '../Icons'

interface ReservationFiltersProps {
  query: string
  onQueryChange: (value: string) => void
  status: StatusFilter
  onStatusChange: (value: StatusFilter) => void
}

export function ReservationFilters({
  query,
  onQueryChange,
  status,
  onStatusChange,
}: ReservationFiltersProps) {
  const { t } = useTranslation()
  const options: StatusFilter[] = ['all', ...RESERVATION_STATUSES]

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full lg:max-w-sm">
        <SearchIcon className="pointer-events-none absolute inset-s-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={t('dashboard.searchPlaceholder')}
          aria-label={t('dashboard.searchPlaceholder')}
          className="h-11 w-full rounded-xl border border-slate-200 bg-white ps-10 pe-10 text-sm placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange('')}
            aria-label={t('common.close')}
            className="absolute inset-e-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-md p-1 text-slate-400 hover:bg-slate-100"
          >
            <CloseIcon width={16} height={16} />
          </button>
        )}
      </div>

      <div
        role="radiogroup"
        aria-label={t('dashboard.filterLabel')}
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:px-0 lg:pb-0"
      >
        {options.map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={status === option}
            onClick={() => onStatusChange(option)}
            className={cn(
              'h-9 shrink-0 cursor-pointer rounded-full px-4 text-sm font-medium transition-colors',
              status === option
                ? 'bg-slate-900 text-white'
                : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
            )}
          >
            {option === 'all' ? t('common.all') : t(`reservation.status.${option}`)}
          </button>
        ))}
      </div>
    </div>
  )
}
