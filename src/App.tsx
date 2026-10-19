import { BrowserRouter } from 'react-router-dom'
import { AuthProvider, ReservationsProvider, ToastProvider } from '@/context'
import { AppRoutes } from '@/routes'

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <ReservationsProvider>
            <AppRoutes />
          </ReservationsProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}
