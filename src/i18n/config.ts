import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import fa from './locales/fa.json'

export const LANGUAGES = {
  fa: { label: 'فارسی', dir: 'rtl', locale: 'fa-IR' },
  en: { label: 'English', dir: 'ltr', locale: 'en-US' },
} as const

export type Language = keyof typeof LANGUAGES
export type Direction = (typeof LANGUAGES)[Language]['dir']

export const DEFAULT_LANGUAGE: Language = 'fa'
const STORAGE_KEY = 'app.language'

export const resources = {
  fa: { translation: fa },
  en: { translation: en },
} as const

export function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && value in LANGUAGES
}

function getInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (isLanguage(saved)) return saved
  } catch {}
  return DEFAULT_LANGUAGE
}

function applyDocumentLanguage(lng: string) {
  const language = isLanguage(lng) ? lng : DEFAULT_LANGUAGE
  document.documentElement.lang = language
  document.documentElement.dir = LANGUAGES[language].dir
  try {
    localStorage.setItem(STORAGE_KEY, language)
  } catch {}
}

i18n.on('languageChanged', applyDocumentLanguage)

void i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: { escapeValue: false },
})

applyDocumentLanguage(i18n.language)

export default i18n
