import { getSessionAction } from "@/actions/auth.actions";
import Navbar from "@/components/shared/Navbar";
import { IEvent } from "@/types/event.types";
import { TResponseUserData } from "@/types/user.types";

export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userinfo=await getSessionAction()
  return (
    <div className="space-y-6 py-6">
      <Navbar user={userinfo.data as TResponseUserData<TResponseUserData<{events:IEvent[]}>>}/>
     <main className="mt-10">
     {children}
     </main>
    </div>
  );
}