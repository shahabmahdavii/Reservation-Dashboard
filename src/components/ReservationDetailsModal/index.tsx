import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '@/hooks'
import { RESERVATION_STATUSES, type Reservation, type ReservationStatus } from '@/types'
import { cn, formatDate, formatDateTime, formatTime, localizeDigits } from '@/utils'
import { Button } from '../Button'
import { CalendarIcon, ClockIcon, NoteIcon, PhoneIcon, TagIcon, UserIcon } from '../Icons'
import { Modal } from '../Modal'
import { StatusBadge } from '../StatusBadge'

interface ReservationDetailsModalProps {
  reservation: Reservation | null
  onClose: () => void
  onStatusChange: (id: string, status: ReservationStatus) => void
}

function DetailRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex items-start gap-3 py-3">
      <span className="mt-0.5 text-slate-400">{icon}</span>
      <div className="min-w-0 flex-1">
        <dt className="text-xs text-slate-500">{label}</dt>
        <dd className="mt-0.5 text-sm font-medium wrap-break-word text-slate-800">{children}</dd>
      </div>
    </div>
  )
}

export function ReservationDetailsModal({
  reservation,
  onClose,
  onStatusChange,
}: ReservationDetailsModalProps) {
  const { t } = useTranslation()
  const { language } = useLanguage()

  return (
    <Modal
      open={reservation !== null}
      onClose={onClose}
      title={t('reservation.details')}
      footer={
        <Button variant="secondary" onClick={onClose}>
          {t('common.close')}
        </Button>
      }
    >
      {reservation && (
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-4">
            <div>
              <p className="text-xs text-slate-500">{t('reservation.fields.id')}</p>
              <p className="ltr-nums font-semibold text-slate-900">{reservation.id}</p>
            </div>
            <StatusBadge status={reservation.status} />
          </div>

          <dl className="divide-y divide-slate-100">
            <DetailRow icon={<UserIcon />} label={t('reservation.fields.customerName')}>
              {reservation.customerName}
            </DetailRow>
            <DetailRow icon={<PhoneIcon />} label={t('reservation.fields.phone')}>
              <a
                href={`tel:${reservation.phone}`}
                className="ltr-nums text-brand-600 hover:underline"
              >
                {localizeDigits(reservation.phone, language)}
              </a>
            </DetailRow>
            <DetailRow icon={<TagIcon />} label={t('reservation.fields.service')}>
              {t(`reservation.services.${reservation.service}`)}
            </DetailRow>
            <div className="grid grid-cols-2 gap-3">
              <DetailRow icon={<CalendarIcon />} label={t('reservation.fields.date')}>
                {formatDate(reservation.date, language)}
              </DetailRow>
              <DetailRow icon={<ClockIcon />} label={t('reservation.fields.time')}>
                {formatTime(reservation.time, language)}
              </DetailRow>
            </div>
            <DetailRow icon={<NoteIcon />} label={t('reservation.fields.notes')}>
              {reservation.notes || (
                <span className="font-normal text-slate-400">{t('reservation.noNotes')}</span>
              )}
            </DetailRow>
            <DetailRow icon={<CalendarIcon />} label={t('reservation.fields.createdAt')}>
              {formatDateTime(reservation.createdAt, language)}
            </DetailRow>
          </dl>

          <fieldset>
            <legend className="mb-2 text-sm font-medium text-slate-700">
              {t('reservation.changeStatus')}
            </legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {RESERVATION_STATUSES.map((status) => (
                <button
                  key={status}
                  type="button"
                  disabled={status === reservation.status}
                  onClick={() => onStatusChange(reservation.id, status)}
                  className={cn(
                    'h-9 cursor-pointer rounded-xl border text-xs font-medium transition-colors',
                    status === reservation.status
                      ? 'cursor-default border-brand-500 bg-brand-50 text-brand-700'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50',
                  )}
                >
                  {t(`reservation.status.${status}`)}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      )}
    </Modal>
  )
}
