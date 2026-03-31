import CreateInvitationForm from "@/components/module/invitation/CreateInvitation"

const InvitationsPage = async({params}:{params:Promise<{id:string}>}) => {
  const {id}=await params
  return (
    <div>
      dk
      <CreateInvitationForm eventId={id}/>
    </div>
  )
}

export default InvitationsPage