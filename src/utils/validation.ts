import type { ParseKeys } from 'i18next'
import type { LoginCredentials, NewReservationInput } from '@/types'
import { currentTime, todayISO } from './date'
import { toLatinDigits } from './digits'

export type TranslationKey = ParseKeys
export type FormErrors<T> = Partial<Record<keyof T, TranslationKey>>

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const PHONE_LENGTH = 11
const PHONE_REGEX = /^09\d{9}$/
export const MIN_PASSWORD_LENGTH = 6

export function normalizePhone(phone: string): string {
  return toLatinDigits(phone).replace(/[\s-]/g, '')
}

export function validateLogin(values: LoginCredentials): FormErrors<LoginCredentials> {
  const errors: FormErrors<LoginCredentials> = {}
  const username = values.username.trim()

  if (!username) errors.username = 'auth.errors.usernameRequired'
  else if (username.includes('@') && !EMAIL_REGEX.test(username))
    errors.username = 'auth.errors.usernameInvalid'

  if (!values.password) errors.password = 'auth.errors.passwordRequired'
  else if (values.password.length < MIN_PASSWORD_LENGTH)
    errors.password = 'auth.errors.passwordShort'

  return errors
}

export function validateReservation(values: NewReservationInput): FormErrors<NewReservationInput> {
  const errors: FormErrors<NewReservationInput> = {}
  const name = values.customerName.trim()
  const today = todayISO()

  if (!name) errors.customerName = 'form.errors.nameRequired'
  else if (name.length < 3) errors.customerName = 'form.errors.nameShort'

  if (!values.phone.trim()) errors.phone = 'form.errors.phoneRequired'
  else if (!PHONE_REGEX.test(normalizePhone(values.phone)))
    errors.phone = 'form.errors.phoneInvalid'

  if (!values.service) errors.service = 'form.errors.serviceRequired'

  if (!values.date) errors.date = 'form.errors.dateRequired'
  else if (values.date < today) errors.date = 'form.errors.datePast'

  if (!values.time) errors.time = 'form.errors.timeRequired'
  else if (values.date === today && values.time < currentTime())
    errors.time = 'form.errors.timePast'

  return errors
}

export function hasErrors<T>(errors: FormErrors<T>): boolean {
  return Object.keys(errors).length > 0
}
