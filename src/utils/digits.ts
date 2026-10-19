const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹'
const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩'

export function toLatinDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(ARABIC_DIGITS.indexOf(d)))
}

export function toDigitsOnly(value: string, maxLength?: number): string {
  const digits = toLatinDigits(value).replace(/\D/g, '')
  return maxLength === undefined ? digits : digits.slice(0, maxLength)
}

export function toPersianDigits(value: string | number): string {
  return String(value).replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)])
}

export function localizeDigits(value: string | number, language: string): string {
  return language === 'fa' ? toPersianDigits(value) : String(value)
}
