import { useEventReservation } from '@/components/EventCard'
import Loading from '@/components/Loading'
import ReservationCard from '@/components/ReservationCard'
import { createFileRoute } from '@tanstack/react-router'
import { Search, Tent } from 'lucide-react'
import { useMemo, useState } from 'react'

export const Route = createFileRoute('/app/events/$eventId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { eventId } = Route.useParams()
  const { data: reservations, isLoading } = useEventReservation()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const participants = useMemo(() => {
    if (reservations) {
      return reservations
        .filter((r: any) => r['Event Name'] === eventId)
        .filter(
          (r: any) => status === 'all' || status === r['Reservation Status'],
        )
        .filter(
          (r: any) =>
            !search.trim() ||
            r['Proposed By']?.toLowerCase().includes(search.toLowerCase()) ||
            r['Special Requests']?.toLowerCase().includes(search.toLowerCase()),
        )
    }
    return []
  }, [eventId, reservations, search, status])
  return (
    <div>
      <h1 className="text-lg font-bold mb-1 flex items-center">
        <Tent className="mr-1" /> {eventId}
      </h1>
      <label className="input w-full my-2">
        <Search className="text-gray-500" />
        <input
          type="search"
          className="grow"
          placeholder="Search Participant Name or Tent"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </label>
      <div className="flex space-x-4 mb-3">
        <label className="label">
          <input
            type="radio"
            name="status"
            className="checkbox"
            value="all"
            checked={status === 'all'}
            onChange={(e) => setStatus(e.target.value)}
          />
          All
        </label>
        <label className="label">
          <input
            type="radio"
            name="status"
            className="checkbox"
            value="Pending"
            checked={status === 'Pending'}
            onChange={(e) => setStatus(e.target.value)}
          />
          Pending
        </label>
        <label className="label">
          <input
            type="radio"
            name="status"
            className="checkbox"
            value="received"
            checked={status === 'received'}
            onChange={(e) => setStatus(e.target.value)}
          />
          DP 50%
        </label>
        <label className="label">
          <input
            type="radio"
            name="status"
            className="checkbox"
            value="confirmed"
            checked={status === 'confirmed'}
            onChange={(e) => setStatus(e.target.value)}
          />
          Confirmed
        </label>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-2">
        {isLoading ? (
          <Loading />
        ) : (
          participants.map((reservation: Record<string, any>) => (
            <ReservationCard
              reservation={reservation}
              key={reservation['id']}
            />
          ))
        )}
      </div>
    </div>
  )
}
