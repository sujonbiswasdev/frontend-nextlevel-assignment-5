import { fetchSingleEventById } from '@/actions/event.actions';
import { getOwnParticipantPayment } from '@/actions/participant.actions';
import EventDetailsPage from '@/components/module/event/EventDetailsContent'
import { IBaseEvent, TResponseEvent } from '@/types/event.types';
import { IgetReviewData } from '@/types/review.types';
import { IBaseUser } from '@/types/user.types';
import React from 'react'
import PaymentSuccessPage from '../../payment/payment-success/[id]/page';

const EventDeta = async({params}:{params:Promise<{id:string}>}) => {
    const {id}=await params
    const eventData = await fetchSingleEventById(id);
    const participant=await getOwnParticipantPayment(id)
    const singleEventData=eventData.data as TResponseEvent<{organizer:IBaseUser,reviews:IgetReviewData[]}>
  return (
    <div>
  
      <EventDetailsPage eventData={singleEventData as any}/>
      </div>
  )
}

export default EventDeta