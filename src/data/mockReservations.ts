import type { Reservation, ReservationStatus, ServiceType } from '@/types'
import { addDays, toISODate } from '@/utils'

type Seed = [string, string, ServiceType, number, string, ReservationStatus, string?]

const SEEDS: Seed[] = [
  ['سارا احمدی', '09121234567', 'haircut', 0, '10:00', 'confirmed', 'مشتری ثابت'],
  ['علی رضایی', '09351112233', 'consultation', 0, '11:30', 'pending'],
  ['مریم کریمی', '09187654321', 'skincare', 1, '09:30', 'confirmed'],
  ['محمد حسینی', '09901239876', 'massage', 1, '16:00', 'pending', 'ترجیحاً با آقای نادری'],
  ['زهرا موسوی', '09134445566', 'coloring', 2, '13:00', 'confirmed'],
  ['رضا جعفری', '09369998877', 'haircut', 3, '18:30', 'cancelled', 'لغو به درخواست مشتری'],
  ['نگار صادقی', '09125556677', 'manicure', -1, '15:00', 'completed'],
  ['امیر محمدی', '09212223344', 'massage', -2, '17:00', 'completed'],
  ['فاطمه نوری', '09398887766', 'skincare', -3, '12:00', 'cancelled'],
  ['حسین قاسمی', '09151239999', 'consultation', 4, '10:30', 'pending'],
  ['الهام شریفی', '09117778899', 'coloring', -5, '14:00', 'completed', 'رنگ بلوند'],
  ['کامران اکبری', '09033332211', 'haircut', 5, '19:00', 'confirmed'],
]

export function createMockReservations(base = new Date()): Reservation[] {
  return SEEDS.map(([customerName, phone, service, offset, time, status, notes], index) => ({
    id: `R-${String(1001 + index)}`,
    customerName,
    phone,
    service,
    date: toISODate(addDays(base, offset)),
    time,
    status,
    notes,
    createdAt: addDays(base, offset - 7).toISOString(),
  }))
}
