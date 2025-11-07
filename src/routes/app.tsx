import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

import Header from '@/components/Header'

export const Route = createFileRoute('/app')({
  beforeLoad: async () => {
    const session = localStorage.getItem('session')
    if (!session) {
      throw redirect({
        to: '/login',
      })
    }
  },
  component: () => (
    <div className="container m-auto relative h-screen flex flex-col">
      <Header />
      <div className="p-4 grow overflow-y-auto">
        <Outlet />
      </div>
    </div>
  ),
})
