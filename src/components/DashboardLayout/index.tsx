import { Outlet } from 'react-router-dom'
import { Header } from '../Header'

export function DashboardLayout() {
  return (
    <div className="min-h-dvh">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <Outlet />
      </main>
    </div>
  )
}
