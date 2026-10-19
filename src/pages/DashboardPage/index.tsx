import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  NewReservationModal,
  PlusIcon,
  ReservationDetailsModal,
  ReservationFilters,
  ReservationsTable,
  StatsCards,
} from '@/components'
import { useFilteredReservations, useLanguage, useReservations, useToast } from '@/hooks'
import type { NewReservationInput, ReservationStatus, StatusFilter } from '@/types'
import { localizeDigits } from '@/utils'

export function DashboardPage() {
  const { t } = useTranslation()
  const { language } = useLanguage()
  const { notify } = useToast()
  const { reservations, addReservation, updateStatus } = useReservations()

  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [isFormOpen, setFormOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filtered = useFilteredReservations(reservations, query, status)
  const selected = reservations.find((r) => r.id === selectedId) ?? null

  const handleCreate = (input: NewReservationInput) => {
    const reservation = addReservation(input)
    notify(t('form.success', { name: reservation.customerName }))
    setQuery('')
    setStatus('all')
    return reservation
  }

  const handleStatusChange = (id: string, next: ReservationStatus) => {
    updateStatus(id, next)
    notify(t('reservation.statusUpdated'))
  }

  const closeForm = useCallback(() => setFormOpen(false), [])
  const closeDetails = useCallback(() => setSelectedId(null), [])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t('dashboard.title')}</h1>
          <p className="mt-1 text-sm text-slate-500">{t('dashboard.subtitle')}</p>
        </div>
        <Button size="lg" icon={<PlusIcon />} onClick={() => setFormOpen(true)}>
          {t('dashboard.newReservation')}
        </Button>
      </div>

      <StatsCards reservations={reservations} activeFilter={status} onSelect={setStatus} />

      <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:p-5">
          <ReservationFilters
            query={query}
            onQueryChange={setQuery}
            status={status}
            onStatusChange={setStatus}
          />
          <p className="text-xs text-slate-500" aria-live="polite">
            {localizeDigits(t('dashboard.resultsCount', { count: filtered.length }), language)}
          </p>
        </div>
        <ReservationsTable reservations={filtered} onView={(r) => setSelectedId(r.id)} />
      </section>

      <NewReservationModal
        open={isFormOpen}
        onClose={closeForm}
        onSubmit={handleCreate}
        onError={(message) => notify(message, 'error')}
      />
      <ReservationDetailsModal
        reservation={selected}
        onClose={closeDetails}
        onStatusChange={handleStatusChange}
      />
    </div>
  )
}
