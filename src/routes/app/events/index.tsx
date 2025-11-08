import EventCard from '@/components/EventCard'
import Loading from '@/components/Loading'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'

export const Route = createFileRoute('/app/events/')({
  component: RouteComponent,
})

function useEventsList() {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data } = await axios.get(
        'https://script.google.com/macros/s/AKfycbw12wkHkS1tkz8SEBdy52t58Y4kGVUKF0kPfL-czfPUtQbOzCBKsRg9KMoD1eWmAALThQ/exec',
        {
          params: {
            sheet: 'Events List',
            indexId: 0,
          },
        },
      )
      return data
    },
  })
}

function RouteComponent() {
  const { data: events, isLoading } = useEventsList()
  if (isLoading) {
    return <Loading />
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-2">
      {events?.map((event: Record<string, any>) => (
        <EventCard event={event} key={event['id']} />
      ))}
    </div>
  )
}
