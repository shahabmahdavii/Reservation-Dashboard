import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import {
  Button,
  EyeIcon,
  EyeOffIcon,
  Input,
  LanguageSwitcher,
  LockIcon,
  Logo,
  UserIcon,
  AlertIcon,
} from '@/components'
import { ROUTES } from '@/constants'
import { DEMO_CREDENTIALS } from '@/data'
import { useAuth, useToast } from '@/hooks'
import type { LoginCredentials } from '@/types'
import { hasErrors, MIN_PASSWORD_LENGTH, validateLogin, type FormErrors } from '@/utils'

const CURRENT_YEAR = new Date().getFullYear()

export function LoginPage() {
  const { t } = useTranslation()
  const { login, isAuthenticated } = useAuth()
  const { notify } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const [values, setValues] = useState<LoginCredentials>({ username: '', password: '' })
  const [errors, setErrors] = useState<FormErrors<LoginCredentials>>({})
  const [authError, setAuthError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) return <Navigate to={ROUTES.DASHBOARD} replace />

  const redirectTo = (location.state as { from?: string } | null)?.from ?? ROUTES.DASHBOARD

  const update = (field: keyof LoginCredentials, value: string) => {
    setValues((v) => ({ ...v, [field]: value }))
    setErrors((e) => ({ ...e, [field]: undefined }))
    setAuthError(false)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const validation = validateLogin(values)
    setErrors(validation)
    if (hasErrors(validation)) return

    setLoading(true)
    const user = await login(values)
    setLoading(false)

    if (!user) {
      setAuthError(true)
      notify(t('auth.errors.invalidCredentials'), 'error')
      return
    }
    notify(t('auth.welcome', { name: user.displayName }))
    navigate(redirectTo, { replace: true })
  }

  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-900 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -end-24 -top-24 size-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -start-16 -bottom-32 size-96 rounded-full bg-fuchsia-400/20 blur-3xl" />
        <Logo light />
        <div className="relative max-w-md">
          <h2 className="text-4xl leading-tight font-bold">{t('auth.heroTitle')}</h2>
          <p className="mt-4 text-lg text-brand-100">{t('auth.heroText')}</p>
        </div>
        <p className="relative text-sm text-brand-200">
          © {CURRENT_YEAR} {t('app.name')}
        </p>
      </aside>

      <main className="flex flex-col px-4 py-6 sm:px-8">
        <div className="flex items-center justify-between lg:justify-end">
          <div className="lg:hidden">
            <Logo />
          </div>
          <LanguageSwitcher />
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm animate-slide-up">
            <h1 className="text-2xl font-bold text-slate-900">{t('auth.title')}</h1>
            <p className="mt-2 text-sm text-slate-500">{t('auth.subtitle')}</p>

            {authError && (
              <div
                role="alert"
                className="mt-6 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
              >
                <AlertIcon className="shrink-0" width={18} height={18} />
                {t('auth.errors.invalidCredentials')}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
              <Input
                id="username"
                label={t('auth.username')}
                placeholder={t('auth.usernamePlaceholder')}
                value={values.username}
                onChange={(e) => update('username', e.target.value)}
                error={errors.username && t(errors.username)}
                startIcon={<UserIcon width={18} height={18} />}
                autoComplete="username"
                className="[unicode-bidi:plaintext]"
              />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                label={t('auth.password')}
                placeholder={t('auth.passwordPlaceholder')}
                value={values.password}
                onChange={(e) => update('password', e.target.value)}
                error={errors.password && t(errors.password, { min: MIN_PASSWORD_LENGTH })}
                startIcon={<LockIcon width={18} height={18} />}
                autoComplete="current-password"
                endAdornment={
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
                    className="cursor-pointer rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOffIcon width={18} height={18} />
                    ) : (
                      <EyeIcon width={18} height={18} />
                    )}
                  </button>
                }
              />
              <Button type="submit" size="lg" fullWidth loading={loading} className="mt-2">
                {loading ? t('auth.submitting') : t('auth.submit')}
              </Button>
            </form>

            <div className="mt-6 rounded-2xl border border-dashed border-brand-200 bg-brand-50/60 p-4 text-sm">
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium text-brand-700">{t('auth.demoTitle')}</p>
                <button
                  type="button"
                  onClick={() => {
                    setValues({ ...DEMO_CREDENTIALS })
                    setErrors({})
                    setAuthError(false)
                  }}
                  className="cursor-pointer text-xs font-medium text-brand-600 hover:underline"
                >
                  {t('auth.fillDemo')}
                </button>
              </div>
              <p className="mt-2 text-slate-600">
                {t('auth.demoUsername')}{' '}
                <code className="ltr-nums font-mono">{DEMO_CREDENTIALS.username}</code>
              </p>
              <p className="text-slate-600">
                {t('auth.demoPassword')}{' '}
                <code className="ltr-nums font-mono">{DEMO_CREDENTIALS.password}</code>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
