import { ReservationsContext } from '@/context'
import { useRequiredContext } from './useRequiredContext'

export const useReservations = () => useRequiredContext(ReservationsContext, 'useReservations')
