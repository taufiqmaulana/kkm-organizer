import { useEventReservation } from '@/components/EventCard'
import Loading from '@/components/Loading'
import ReservationCard from '@/components/ReservationCard'
import { createFileRoute } from '@tanstack/react-router'
import { Search, Tent } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts'

type Series = {
  name: string
  value: number
  fill: string
}[]

type ChartData = {
  status: Series
  participantType: Series
}

export const Route = createFileRoute('/app/events/$eventId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { eventId } = Route.useParams()
  const { data: reservations, isLoading } = useEventReservation()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [chartData, setChartData] = useState<ChartData>({
    status: [],
    participantType: [],
  })
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
  useEffect(() => {
    if (reservations && eventId) {
      const participants = reservations.filter(
        (r: any) => r['Event Name'] === eventId,
      )
      setChartData({
        status: [
          {
            name: 'Pending',
            value: participants.filter(
              (p: any) => p['Reservation Status'] === 'Pending',
            ).length,
            fill: '#ff8042',
          },
          {
            name: 'Lunas',
            value: participants.filter(
              (p: any) => p['Reservation Status'] === 'received',
            ).length,
            fill: '#00c49f',
          },
          {
            name: 'DP 50%',
            value: participants.filter(
              (p: any) => p['Reservation Status'] === 'confirmed',
            ).length,
            fill: '#ffbb28',
          },
        ],
        participantType: [
          {
            name: 'Baru',
            value: participants.filter(
              (p: any) => p['Jenis Anggota'] === 'Anggota Baru',
            ).length,
            fill: '#00c49f',
          },
          {
            name: 'Alumni',
            value: participants.filter(
              (p: any) => p['Jenis Anggota'] === 'Alumni',
            ).length,
            fill: '#ff8042',
          },
        ],
      })
    }
  }, [reservations, eventId])
  return (
    <div>
      <h1 className="text-lg font-bold mb-1 flex items-center">
        <Tent className="mr-1" /> {eventId}
      </h1>
      <div className="tabs tabs-lift">
        <input
          type="radio"
          name="tab_event"
          className="tab"
          aria-label="Resevations"
          defaultChecked
        />
        <div className="tab-content">
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
          <div className="flex gap-2 mb-3 w-full flex-wrap">
            <label className="label">
              <input
                type="radio"
                name="status"
                className="checkbox checkbox-sm"
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
                className="checkbox checkbox-sm"
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
                className="checkbox checkbox-sm"
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
                className="checkbox checkbox-sm"
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
        <input
          type="radio"
          name="tab_event"
          className="tab"
          aria-label="Summary"
        />
        <div className="tab-content">
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-2">
            <div className="card bg-base-100 w-full shadow-sm">
              <figure>
                <PieChart
                  style={{
                    width: '100%',
                    maxWidth: '500px',
                    maxHeight: '80vh',
                    aspectRatio: 1,
                  }}
                  responsive
                >
                  <Pie
                    data={chartData.status}
                    innerRadius="60%"
                    outerRadius="80%"
                    // Corner radius is the rounded edge of each pie slice
                    cornerRadius="50%"
                    fill="#8884d8"
                    // padding angle is the gap between each pie slice
                    paddingAngle={5}
                    dataKey="value"
                    isAnimationActive
                  >
                    {chartData.status.map((entry) => (
                      <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </figure>
              <div className="card-body">
                <h2 className="card-title m-auto">Status Pembayaran</h2>
              </div>
            </div>
            <div className="card bg-base-100 w-full shadow-sm">
              <figure>
                <PieChart
                  style={{
                    width: '100%',
                    maxWidth: '500px',
                    maxHeight: '80vh',
                    aspectRatio: 1,
                  }}
                  responsive
                >
                  <Pie
                    data={chartData.participantType}
                    innerRadius="60%"
                    outerRadius="80%"
                    // Corner radius is the rounded edge of each pie slice
                    cornerRadius="50%"
                    fill="#8884d8"
                    // padding angle is the gap between each pie slice
                    paddingAngle={5}
                    dataKey="value"
                    isAnimationActive
                  >
                    {chartData.participantType.map((entry) => (
                      <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </figure>
              <div className="card-body">
                <h2 className="card-title m-auto">Jenis Anggota</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
