import { getSessionAction } from "@/actions/auth.actions"
import { UpdateParticipantForm } from "@/components/module/participant/UpdatePaticipant"
import { UserRole } from "@/lib/authUtils"

const Page = async({params}:{params:Promise<{id:string}>}) => {
     const {id} =await params
     const userinfo=await getSessionAction()
     const role=userinfo.data?.role
  return (
    <div>
    </div>
  )
}

export default Page