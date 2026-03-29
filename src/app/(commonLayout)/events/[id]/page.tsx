import { fetchSingleEventById } from '@/actions/event.actions';
import EventDetailsPage from '@/components/module/event/EventDetailsContent'
import { IBaseEvent } from '@/types/event.types';
import React from 'react'

const EventDeta = async({params}:{params:Promise<{id:string}>}) => {
    const {id}=await params
    const eventData = await fetchSingleEventById(id);
    const singleEventData=eventData.data as IBaseEvent
  return (
    <div>
        <EventDetailsPage eventData={singleEventData}/>
    </div>
  )
}

export default EventDeta