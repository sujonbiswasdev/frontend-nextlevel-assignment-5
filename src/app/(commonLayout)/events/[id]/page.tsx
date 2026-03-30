import { fetchSingleEventById } from '@/actions/event.actions';
import EventDetailsPage from '@/components/module/event/EventDetailsContent'
import { IBaseEvent, TResponseEvent } from '@/types/event.types';
import { IgetReviewData } from '@/types/review.types';
import { IBaseUser } from '@/types/user.types';
import React from 'react'

const EventDeta = async({params}:{params:Promise<{id:string}>}) => {
    const {id}=await params
    const eventData = await fetchSingleEventById(id);
    const singleEventData=eventData.data as TResponseEvent<{organizer:IBaseUser,reviews:IgetReviewData[]}>
  return (
    <div>
        <EventDetailsPage eventData={singleEventData as any}/>
    </div>
  )
}

export default EventDeta