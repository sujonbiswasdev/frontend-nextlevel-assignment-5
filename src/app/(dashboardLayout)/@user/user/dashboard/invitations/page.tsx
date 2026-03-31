import { getOwnUserInvitationsAction } from '@/actions/invitation.actions';
import GetOwnInvitations from '@/components/module/invitation/GetOwnInvitations';
import { TOwnInvitations, TResponseInvitation } from '@/types/invitation.types';
import React from 'react'

const InvitationsPage = async() => {
  const invitationsPromise =await getOwnUserInvitationsAction();
  return (
    <div> 
      <GetOwnInvitations invitations={invitationsPromise.data as  TOwnInvitations<TResponseInvitation>}/>
    </div>
  )
}

export default InvitationsPage