import { getSessionAction } from "@/actions/auth.actions"

const Page = async({params}:{params:{id:string}}) => {
     const {id} =await params
     const userinfo=await getSessionAction()
     const role=userinfo.data?.role
     
  return (
    <div>
    </div>
  )
}

export default Page