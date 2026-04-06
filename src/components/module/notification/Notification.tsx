"use client";

import { useEffect, useState } from "react";
import { Bell, UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { getUserNotificationsAction } from "@/actions/notification";
import { updateInvitationStatusAction } from "@/actions/invitation.actions";
import { toast } from "react-toastify";

import { TNotification } from "@/types/notification.type";
import { IBaseUser } from "@/types/user.types";
import { IBaseEvent } from "@/types/event.types";
import { TInvitation } from "@/types/invitation.types";
import { createParticipant } from "@/actions/participant.actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

type TNotif = TNotification<{
  user: IBaseUser;
  event: IBaseEvent;
  invitation: TInvitation;
}>;

export function NavbarNotifications() {
  const [notifications, setNotifications] = useState<TNotif[]>([]);
  const [responding, setResponding] = useState<string | null>(null);
  const router = useRouter();
  const handleAddParticipant = async (
    eventId: string,
    invitationId: string
  ) => {
    const toastId = toast.loading("Registering attendance...");

    try {
      const res = await createParticipant(eventId);

      if (res.success) {
        await handleNotificationAction({
          id: invitationId,
          status: "ACCEPTED",
        });

        toast.dismiss(toastId);
        toast.success("You have been added as a participant!");
        if (res.data?.paymentUrl) {
          router.push(res.data.paymentUrl);
        } else {
          router.push(`/events/${eventId}`);
        }
      } else {
        toast.dismiss(toastId);
        toast.error(res.message || "Failed to add participant.");
      }
    } catch (err) {
      toast.dismiss(toastId);
      toast.error("Failed to add participant.");
      console.error(err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await getUserNotificationsAction();
      const safeData = Array.isArray(res?.data) ? res.data : [];

      setNotifications(
        safeData.filter(
          (n): n is TNotif =>
            !!n &&
            typeof n === "object" &&
            (n as any).invitation !== undefined
        )
      );
    } catch (err) {
      setNotifications([]);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleNotificationAction = async ({
    id,
    status,
  }: {
    id: string;
    status: "ACCEPTED" | "DECLINED";
  }) => {
    setResponding(id);

    const loadingToastId = toast.loading("Updating invitation status...");

    try {
      const res = await updateInvitationStatusAction({ id, status });

      if (res?.success) {
        toast.dismiss(loadingToastId);

        // ✅ FIXED: refresh correctly
        await fetchNotifications();

        toast.success(
          res?.message || "Invitation status updated successfully.",
          { autoClose: 4000 }
        );
      } else {
        toast.dismiss(loadingToastId);

        toast.error(res?.message || "Failed to update invitation status.", {
          autoClose: 4000,
        });

        await fetchNotifications();
      }
    } catch (error: any) {
      toast.dismiss(loadingToastId);
      toast.error(error?.message || "An unexpected error occurred.");
    } finally {
      setResponding(null);
    }
  };

  const count = notifications?.length ?? 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative outline-none rounded-full">
        <span className="relative flex items-center justify-center w-7 h-7">
          <Bell size={16} strokeWidth={2.1} className="text-gray-700" />

          {count > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 text-xs font-bold text-white bg-emerald-600 border-2 border-white rounded-full flex items-center justify-center shadow-lg">
              {count > 99 ? "99+" : count}
            </span>
          )}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[315px] max-h-[335px] rounded-lg shadow-xl border p-0 overflow-hidden">
        <div className="px-3 py-2 border-b text-xs font-semibold">
          Notifications
        </div>

        <div className="max-h-[260px] overflow-y-auto">
          {count === 0 ? (
            <div className="py-8 flex flex-col items-center">
              <Bell size={16} className="text-zinc-300 mb-1" />
              <span className="text-xs text-zinc-400">
                No new notifications
              </span>
            </div>
          ) : (
            notifications.map((n) => {
              const user = (n as any).user as IBaseUser | undefined;
              const event = (n as any).invitation.event as
                | IBaseEvent
                | undefined;
              const invitation = (n as any).invitation as
                | TInvitation
                | undefined;

              return (
                <div
                  key={n.id}
                  className="flex gap-2 py-2 px-3 hover:bg-emerald-50 rounded-md"
                >
                  <div>
                    {user?.image ? (
                      <img
                        src={user.image}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <UserCircle className="w-6 h-6 text-gray-400" />
                    )}
                  </div>

                  <div className="flex-1 text-xs">
                    <div className="font-medium flex items-center gap-2">
                      {user?.name || "Someone"}
                      <Link
                        href={`/events/${event?.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        click
                      </Link>
                    </div>

                    <div>{n.message}</div>

                    {event?.priceType === "PAID" ? (
                      <Button
                        disabled={responding === invitation?.id}
                        onClick={() =>
                          handleAddParticipant(
                            event.id,
                            invitation?.id as string
                          )
                        }
                      >
                        pay & Accept
                      </Button>
                    ) : (
                      invitation?.status === "PENDING" && (
                        <div className="flex gap-2 mt-2">
                          <Button
                            disabled={responding === invitation?.id}
                            onClick={() =>
                              handleNotificationAction({
                                id: invitation.id,
                                status: "ACCEPTED",
                              })
                            }
                          >
                            Accept
                          </Button>

                          <Button
                            disabled={responding === invitation?.id}
                            onClick={() =>
                              handleNotificationAction({
                                id: invitation.id,
                                status: "DECLINED",
                              })
                            }
                          >
                            Decline
                          </Button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}