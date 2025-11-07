import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/events/')({
  component: RouteComponent,
})

function useEventsList() {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbw12wkHkS1tkz8SEBdy52t58Y4kGVUKF0kPfL-czfPUtQbOzCBKsRg9KMoD1eWmAALThQ/exec?sheet=Events%20List&indexId=0',
      )
      return await response.json()
    },
  })
}

function RouteComponent() {
  const { data } = useEventsList()
  return (
    <div>
      {data?.map((d: any) => (
        <div
          key={d.id}
          className="card card-sm bg-base-100 w-96 shadow-sm mb-4"
        >
          <div className="card-body">
            <h2 className="card-title">{d['Activity']}</h2>
            <span>{d['Type']}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
