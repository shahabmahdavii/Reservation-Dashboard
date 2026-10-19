import type { ReservationStatus } from '@/types'

export const STATUS_STYLES: Record<
  ReservationStatus,
  { badge: string; dot: string; card: string }
> = {
  pending: {
    badge: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    dot: 'bg-amber-500',
    card: 'bg-amber-50 text-amber-600',
  },
  confirmed: {
    badge: 'bg-sky-50 text-sky-700 ring-sky-600/20',
    dot: 'bg-sky-500',
    card: 'bg-sky-50 text-sky-600',
  },
  completed: {
    badge: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    dot: 'bg-emerald-500',
    card: 'bg-emerald-50 text-emerald-600',
  },
  cancelled: {
    badge: 'bg-rose-50 text-rose-700 ring-rose-600/20',
    dot: 'bg-rose-500',
    card: 'bg-rose-50 text-rose-600',
  },
}
