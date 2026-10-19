import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ROUTES } from '@/constants'
import { useAuth } from '@/hooks'

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated)
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location.pathname }} />
  return <Outlet />
}
