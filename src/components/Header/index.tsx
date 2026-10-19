import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants'
import { useAuth, useToast } from '@/hooks'
import { Button } from '../Button'
import { LogoutIcon } from '../Icons'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { Logo } from '../Logo'

export function Header() {
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const { notify } = useToast()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    notify(t('auth.loggedOut'), 'info')
    navigate(ROUTES.LOGIN, { replace: true })
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Logo />
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          {user && (
            <span className="hidden items-center gap-2 text-sm text-slate-600 md:flex">
              <span className="grid size-8 place-items-center rounded-full bg-brand-100 font-semibold text-brand-700">
                {user.displayName.charAt(0)}
              </span>
              {user.username}
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            icon={<LogoutIcon width={18} height={18} className="rtl:-scale-x-100" />}
            aria-label={t('common.logout')}
          >
            <span className="hidden sm:inline">{t('common.logout')}</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
