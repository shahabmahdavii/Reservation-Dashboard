import { createContext } from 'react'
import type { NewReservationInput, Reservation, ReservationStatus } from '@/types'

export interface ReservationsContextValue {
  reservations: Reservation[]
  addReservation: (input: NewReservationInput) => Reservation
  updateStatus: (id: string, status: ReservationStatus) => void
}

export const ReservationsContext = createContext<ReservationsContextValue | null>(null)
