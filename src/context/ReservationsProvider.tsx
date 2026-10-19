import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { createMockReservations } from '@/data'
import type { NewReservationInput, Reservation, ReservationStatus } from '@/types'
import { normalizePhone, readStorage, writeStorage } from '@/utils'
import { ReservationsContext, type ReservationsContextValue } from './ReservationsContext'

const STORAGE_KEY = 'app.reservations'

function nextId(reservations: Reservation[]): string {
  const max = reservations.reduce(
    (acc, r) => Math.max(acc, Number(r.id.replace(/\D/g, '')) || 0),
    1000,
  )
  return `R-${max + 1}`
}

export function ReservationsProvider({ children }: { children: ReactNode }) {
  const [reservations, setReservations] = useState<Reservation[]>(() =>
    readStorage(STORAGE_KEY, createMockReservations()),
  )

  useEffect(() => {
    writeStorage(STORAGE_KEY, reservations)
  }, [reservations])

  const addReservation = useCallback(
    (input: NewReservationInput) => {
      const reservation: Reservation = {
        ...input,
        id: nextId(reservations),
        customerName: input.customerName.trim(),
        phone: normalizePhone(input.phone),
        notes: input.notes?.trim() || undefined,
        status: 'pending',
        createdAt: new Date().toISOString(),
      }
      setReservations((current) => [reservation, ...current])
      return reservation
    },
    [reservations],
  )

  const updateStatus = useCallback((id: string, status: ReservationStatus) => {
    setReservations((current) => current.map((r) => (r.id === id ? { ...r, status } : r)))
  }, [])

  const value = useMemo<ReservationsContextValue>(
    () => ({ reservations, addReservation, updateStatus }),
    [reservations, addReservation, updateStatus],
  )

  return <ReservationsContext.Provider value={value}>{children}</ReservationsContext.Provider>
}
