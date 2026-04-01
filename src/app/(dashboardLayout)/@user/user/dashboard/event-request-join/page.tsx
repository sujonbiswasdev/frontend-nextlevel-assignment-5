import { getParticipantsByEvent } from '@/actions/participant.actions';
import ErrorBoundary from '@/components/ErrorBoundary';
import RequestEventJoinContent from '@/components/module/participant/EventJoinTable';
import { IBaseEvent } from '@/types/event.types';
import { TResponseParticipant } from '@/types/participant.types';
import { IBaseUser } from '@/types/user.types';
import React from 'react'

const RequestEventJoin = async({
    searchParams,
  }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }) => {

  const search = await searchParams;
  const participantsByEvent = await getParticipantsByEvent(search, {
    revalidate: 2
  });
  return (
    <React.Suspense fallback={<div>Loading event participant requests...</div>}>
      <ErrorBoundary fallback={<div>Something went wrong loading event join requests.</div>}>
        <div>
            <RequestEventJoinContent participants={participantsByEvent.data as TResponseParticipant<{event: IBaseEvent[],user:IBaseUser[] }>[]}/>
        </div>
      </ErrorBoundary>
    </React.Suspense>
  )
}

export default RequestEventJoin