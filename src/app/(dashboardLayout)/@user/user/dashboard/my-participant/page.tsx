import { getParticipants } from '@/actions/participant.actions';
import ParticipantContent from '@/components/module/participant/ParticipantContent';
import { IBaseEvent } from '@/types/event.types';
import { TResponseParticipant } from '@/types/participant.types';
import { IBaseUser } from '@/types/user.types';
import next from 'next';
import React from 'react'

const ParticipantPage = async({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {

  const search=await searchParams
 
  const participants= await getParticipants(search,{
    revalidate: 60
  });
  return (
    <div>
      <ParticipantContent participants={participants.data as TResponseParticipant<{user:IBaseUser[],event:IBaseEvent[]}>[]}/>

    </div>
  )
}

export default ParticipantPage