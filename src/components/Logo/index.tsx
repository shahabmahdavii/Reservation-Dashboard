import { useTranslation } from 'react-i18next'
import { LogoIcon } from '../Icons'

export function Logo({ light = false }: { light?: boolean }) {
  const { t } = useTranslation()
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid size-10 place-items-center rounded-xl bg-brand-600 text-white shadow-md shadow-brand-600/30">
        <LogoIcon width={22} height={22} />
      </span>
      <div className="leading-tight">
        <p className={light ? 'font-bold text-white' : 'font-bold text-slate-900'}>
          {t('app.name')}
        </p>
        <p className={light ? 'text-xs text-brand-100' : 'hidden text-xs text-slate-500 sm:block'}>
          {t('app.tagline')}
        </p>
      </div>
    </div>
  )
}
