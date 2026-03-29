import { getSessionAction } from "@/actions/auth.actions";
import Footer from "@/components/shared/Footer";
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
    <div className="max-w-[1480px] mx-auto">
      <Navbar user={userinfo.data as TResponseUserData<TResponseUserData<{events:IBaseEvent[]}>>}/>
     <main className="mt-2">
     {children}
     </main>
     <Footer/>
    </div>
  );
}