import { getSessionAction } from "@/actions/auth.actions";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { IBaseEvent } from "@/types/event.types";
import { TResponseUserData } from "@/types/user.types";
import ErrorBoundary from "@/components/ErrorBoundary";
import ErrorFallback from "@/components/ErrorFallback";

export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userinfo = await getSessionAction();
  return (
    <div className="max-w-[1480px] mx-auto">
      <ErrorBoundary
        fallback={
          <ErrorFallback
            title="Navigation Error"
            message="Something went wrong while loading the navigation bar."
          />
        }
      >
        <Navbar
          user={
            userinfo.data as TResponseUserData<
              TResponseUserData<{ events: IBaseEvent[] }>
            >
          }
        />
      </ErrorBoundary>
      <main className="mt-2">
        <ErrorBoundary
          fallback={
            <ErrorFallback
              title="Unexpected Error"
              message="Something went wrong while loading the page."
            />
          }
        >
          {children}
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}