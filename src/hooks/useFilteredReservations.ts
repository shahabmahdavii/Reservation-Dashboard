import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { Reservation, StatusFilter } from '@/types'
import { toLatinDigits } from '@/utils'

export function useFilteredReservations(
  reservations: Reservation[],
  query: string,
  status: StatusFilter,
) {
  const { i18n } = useTranslation()

  return useMemo(() => {
    const q = toLatinDigits(query.trim().toLocaleLowerCase(i18n.language))
    return reservations
      .filter((r) => status === 'all' || r.status === status)
      .filter(
        (r) =>
          !q ||
          r.customerName.toLocaleLowerCase(i18n.language).includes(q) ||
          r.phone.includes(q) ||
          r.id.toLowerCase().includes(q),
      )
      .sort((a, b) => `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`))
  }, [reservations, query, status, i18n.language])
}
