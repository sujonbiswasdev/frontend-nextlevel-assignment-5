import { getSessionAction } from '@/actions/auth.actions';
import { getParticipants } from '@/actions/participant.actions';
import ParticipantContent from '@/components/module/participant/ParticipantContent';
import { IBaseEvent, TPagination } from '@/types/event.types';
import { TResponseParticipant } from '@/types/participant.types';
import { IBaseUser } from '@/types/user.types';
import next from 'next';
import React from 'react'

const ParticipantPage = async({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {

  const userinfo = await getSessionAction();
  const role=userinfo.data?.role
  const search=await searchParams
 
  const participants= await getParticipants(search,{
    revalidate: 2
  });
  console.log(participants,'ts')
  return (
    <div>
      <ParticipantContent pagination={participants.pagination as TPagination} participants={participants.data as TResponseParticipant<{ user: IBaseUser[]; event: IBaseEvent[]}>[]} role={role as string}/>
    </div>
  )
}

export default ParticipantPage