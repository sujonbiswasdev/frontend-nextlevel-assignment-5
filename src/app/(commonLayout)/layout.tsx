import { getSessionAction } from "@/actions/auth.actions";
import Navbar from "@/components/shared/Navbar";
import { IBaseEvent } from "@/types/event.types";
import { TResponseUserData } from "@/types/user.types";

export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userinfo=await getSessionAction()
  return (
    <div className="">
      <Navbar user={userinfo.data as TResponseUserData<TResponseUserData<{events:IBaseEvent[]}>>}/>
     <main className="mt-20">
     {children}
     </main>
    </div>
  );
}