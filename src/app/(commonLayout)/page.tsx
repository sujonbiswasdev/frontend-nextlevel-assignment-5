import { getSessionAction } from "@/actions/auth.actions";
import HeroSlider from "@/components/hero-slider";
import UpcommingEvent from "@/components/UpcommingEvent";

export default async function Home() {
  const userinfo=await getSessionAction()
  return (
    <div className=" flex flex-col">
      <HeroSlider/>
      <UpcommingEvent/>
    </div>
  );
}
