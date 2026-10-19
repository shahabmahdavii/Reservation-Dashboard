export const RESERVATION_STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'] as const
export type ReservationStatus = (typeof RESERVATION_STATUSES)[number]

export const SERVICE_TYPES = [
  'haircut',
  'coloring',
  'manicure',
  'skincare',
  'massage',
  'consultation',
] as const
export type ServiceType = (typeof SERVICE_TYPES)[number]

export interface Reservation {
  id: string
  customerName: string
  phone: string
  service: ServiceType
  date: string
  time: string
  status: ReservationStatus
  notes?: string
  createdAt: string
}

export type NewReservationInput = Pick<
  Reservation,
  'customerName' | 'phone' | 'service' | 'date' | 'time' | 'notes'
>

export type StatusFilter = ReservationStatus | 'all'
