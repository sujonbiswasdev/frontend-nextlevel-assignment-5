import { getOwnUserInvitationsAction } from '@/actions/invitation.actions';
import GetOwnInvitations from '@/components/module/invitation/GetOwnInvitations';
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
  return (
    <div> 
      <GetOwnInvitations invitations={invitationdata} />
    </div>
  )
}

export default InvitationsPage