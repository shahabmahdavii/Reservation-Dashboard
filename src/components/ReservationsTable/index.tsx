import { useTranslation } from 'react-i18next'
import { useLanguage } from '@/hooks'
import type { Reservation } from '@/types'
import { formatDate, formatTime, localizeDigits } from '@/utils'
import { EmptyState } from '../EmptyState'
import { CalendarIcon, ClockIcon, EyeIcon, SearchIcon } from '../Icons'
import { StatusBadge } from '../StatusBadge'

interface ReservationsTableProps {
  reservations: Reservation[]
  onView: (reservation: Reservation) => void
}

export function ReservationsTable({ reservations, onView }: ReservationsTableProps) {
  const { t } = useTranslation()
  const { language } = useLanguage()

  if (reservations.length === 0) {
    return (
      <EmptyState
        icon={<SearchIcon width={28} height={28} />}
        title={t('common.noResults')}
        description={t('common.noResultsHint')}
      />
    )
  }

  const headers = ['customerName', 'phone', 'service', 'date', 'time', 'status', 'actions'] as const

  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60 text-xs text-slate-500">
              {headers.map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="px-5 py-3 text-start font-medium whitespace-nowrap"
                >
                  {t(`reservation.fields.${h}`)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reservations.map((r) => (
              <tr key={r.id} className="transition-colors hover:bg-slate-50/70">
                <td className="px-5 py-3.5">
                  <div className="font-medium text-slate-900">{r.customerName}</div>
                  <div className="ltr-nums text-xs text-slate-400">{r.id}</div>
                </td>
                <td className="px-5 py-3.5 text-slate-600">
                  <span className="ltr-nums">{localizeDigits(r.phone, language)}</span>
                </td>
                <td className="px-5 py-3.5 text-slate-600">
                  {t(`reservation.services.${r.service}`)}
                </td>
                <td className="px-5 py-3.5 whitespace-nowrap text-slate-600">
                  {formatDate(r.date, language)}
                </td>
                <td className="px-5 py-3.5 text-slate-600">{formatTime(r.time, language)}</td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={r.status} />
                </td>
                <td className="px-5 py-3.5">
                  <button
                    type="button"
                    onClick={() => onView(r)}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-brand-600 transition-colors hover:bg-brand-50"
                  >
                    <EyeIcon width={16} height={16} />
                    {t('reservation.viewDetails')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-slate-100 md:hidden">
        {reservations.map((r) => (
          <li key={r.id}>
            <button
              type="button"
              onClick={() => onView(r)}
              className="flex w-full cursor-pointer flex-col gap-2.5 px-4 py-4 text-start transition-colors active:bg-slate-50"
            >
              <div className="flex w-full items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-slate-900">{r.customerName}</p>
                  <p className="text-sm text-slate-500">{t(`reservation.services.${r.service}`)}</p>
                </div>
                <StatusBadge status={r.status} />
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <CalendarIcon width={14} height={14} /> {formatDate(r.date, language)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <ClockIcon width={14} height={14} /> {formatTime(r.time, language)}
                </span>
                <span className="ltr-nums">{localizeDigits(r.phone, language)}</span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}
