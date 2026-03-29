import { fetchEvents } from "@/actions/event.actions"

const EventsPage =async () => {
  const events=await fetchEvents()
  console.log(events,'events')


  return (
    <div>
      {/* <AdvancedTable columns={columns as any} actions={actions}  data={categoryData}/> */}
    </div>
  )
}

export default EventsPage