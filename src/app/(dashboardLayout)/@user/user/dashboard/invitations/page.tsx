import { getOwnUserInvitationsAction } from '@/actions/invitation.actions';
import ErrorBoundary from '@/components/ErrorBoundary';
import ErrorFallback from '@/components/ErrorFallback';
import GetOwnInvitations from '@/components/module/invitation/GetOwnInvitations';
import { TPagination } from '@/types/event.types';
import { TOwnInvitations, TResponseInvitation } from '@/types/invitation.types';
import React from 'react'

const InvitationsPage = async({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const search=await searchParams
  const invitationsPromise =await getOwnUserInvitationsAction(search);
  const invitationdata=invitationsPromise.data?.sentInvitations as TResponseInvitation[]
  const pagination=invitationsPromise.data?.sentPagination as TPagination
  if (!invitationdata || !Array.isArray(invitationdata)) {
    throw new Error("No invitation data found or invalid data format.");
  }
  return (
    <div>
      <ErrorBoundary fallback={<ErrorFallback title="invitation load failed" message="Something went wrong while loading your invitations." />}>
        <GetOwnInvitations invitations={invitationdata} pagination={pagination} />
      </ErrorBoundary>
    </div>
  )
}

export default InvitationsPage