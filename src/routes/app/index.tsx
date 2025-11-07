import { createFileRoute, Link } from '@tanstack/react-router'
import { Tent } from 'lucide-react'

export const Route = createFileRoute('/app/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex">
      <div className="card shadow hover:shadow-xl">
        <Link to="/app/events" className="card-body">
          <Tent size={32} />
          <span>Manage Event</span>
        </Link>
      </div>
    </div>
  )
}
