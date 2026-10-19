import { LANGUAGES, isLanguage } from '@/i18n'

const pad = (n: number) => String(n).padStart(2, '0')

export function toISODate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

export function todayISO(): string {
  return toISODate(new Date())
}

export function currentTime(): string {
  const now = new Date()
  return `${pad(now.getHours())}:${pad(now.getMinutes())}`
}

function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function localeFor(language: string): string {
  return isLanguage(language) && language === 'fa'
    ? `${LANGUAGES.fa.locale}-u-ca-persian`
    : LANGUAGES.en.locale
}

export function formatDate(iso: string, language: string): string {
  return new Intl.DateTimeFormat(localeFor(language), {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(parseISODate(iso))
}

export function formatTime(time: string, language: string): string {
  const [h, m] = time.split(':').map(Number)
  const date = new Date()
  date.setHours(h, m, 0, 0)
  return new Intl.DateTimeFormat(localeFor(language), {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)
}

export function formatDateTime(isoDateTime: string, language: string): string {
  return new Intl.DateTimeFormat(localeFor(language), {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(isoDateTime))
}
