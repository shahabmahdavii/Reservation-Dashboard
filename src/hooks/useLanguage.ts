import { useTranslation } from 'react-i18next'
import { DEFAULT_LANGUAGE, LANGUAGES, isLanguage, type Language } from '@/i18n'

export function useLanguage() {
  const { i18n } = useTranslation()
  const language: Language = isLanguage(i18n.language) ? i18n.language : DEFAULT_LANGUAGE

  return {
    language,
    dir: LANGUAGES[language].dir,
    isRtl: LANGUAGES[language].dir === 'rtl',
    setLanguage: (lng: Language) => void i18n.changeLanguage(lng),
  }
}
