import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import axios from 'axios'
import { useEffect, useState } from 'react'

export function useEventReservation() {
  return useQuery({
    queryKey: ['reservations'],
    queryFn: async () => {
      const { data } = await axios.get(
        'https://script.google.com/macros/s/AKfycbw12wkHkS1tkz8SEBdy52t58Y4kGVUKF0kPfL-czfPUtQbOzCBKsRg9KMoD1eWmAALThQ/exec',
        {
          params: {
            sheet: 'Event Reservation',
            indexId: 24,
          },
        },
      )
      return data
    },
  })
}

export default function EventCard({ event }: { event: Record<string, any> }) {
  const { data: reservations, isLoading } = useEventReservation()
  const [total, setTotal] = useState({
    participant: 0,
    pending: 0,
    confirmed: 0,
  })
  useEffect(() => {
    if (reservations && event) {
      const participants = reservations.filter(
        (r: any) => r['Event Name'] === event['Activity'],
      )
      setTotal({
        participant: participants.length,
        pending: participants.filter(
          (p: any) => p['Reservation Status'] !== 'confirmed',
        ).length,
        confirmed: participants.filter(
          (p: any) => p['Reservation Status'] === 'confirmed',
        ).length,
      })
    }
  }, [reservations, event])
  return (
    <Link
      to={'/app/events/' + event['Activity']}
      className="card card-sm card-side border border-gray-300 bg-base-100 w-full shadow-sm mb-4 hover:shadow-xl cursor-pointer"
    >
      <figure className="flex-1">
        <img
          src={event['event images']}
          alt="Event Image"
          className="object-left object-cover"
        />
      </figure>
      <div className="card-body w-[200px]">
        <h2 className="card-title">{event['Activity']}</h2>
        {event['Type'] === 'Open Now' ? (
          <span className="badge badge-success badge-sm">Open Now</span>
        ) : (
          <span className="badge badge-neutral badge-sm">Closed</span>
        )}
        <p>{event['description']}</p>
        {isLoading ? (
          <div className="skeleton h-4 w-full"></div>
        ) : (
          <div className="flex flex-wrap gap-2">
            <span>
              <b className="text-lg mr-1">{total.participant}</b>Participants
            </span>
            <span>
              <b className="text-lg mr-1">{total.confirmed}</b>Confirmed
            </span>
            <span>
              <b className="text-lg mr-1">{total.pending}</b>Pendings
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
