import { createFileRoute, Link } from '@tanstack/react-router'
import { Tent } from 'lucide-react'

export const Route = createFileRoute('/app/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      <div className="card shadow hover:shadow-xl bg-base-100">
        <Link to="/app/events" className="card-body">
          <Tent size={32} />
          <span className="text-lg">Manage Events</span>
        </Link>
      </div>
    </div>
  )
}
