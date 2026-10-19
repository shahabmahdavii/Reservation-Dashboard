import { useLanguage } from '@/hooks'
import { LANGUAGES, type Language } from '@/i18n'
import { cn } from '@/utils'
import { GlobeIcon } from '../Icons'

export function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage()

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        'inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1',
        className,
      )}
    >
      <GlobeIcon className="mx-1 text-slate-400" width={16} height={16} />
      {(Object.keys(LANGUAGES) as Language[]).map((lng) => (
        <button
          key={lng}
          type="button"
          lang={lng}
          onClick={() => setLanguage(lng)}
          aria-pressed={language === lng}
          className={cn(
            'cursor-pointer rounded-lg px-2.5 py-1 text-xs font-medium transition-colors',
            language === lng ? 'bg-brand-600 text-white' : 'text-slate-600 hover:bg-slate-100',
          )}
        >
          {LANGUAGES[lng].label}
        </button>
      ))}
    </div>
  )
}
