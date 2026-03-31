"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { getUserNotificationsAction } from "@/actions/notification";
import { TNotification } from "@/types/notification.type";
import { IBaseUser } from "@/types/user.types";
import { IBaseEvent } from "@/types/event.types";
import { TInvitation } from "@/types/invitation.types";
import { UserCircle } from "lucide-react";
export function NavbarNotifications() {
  const [notifications, setNotifications] = useState<
    TNotification<{ user: IBaseUser; event: IBaseEvent; invitation: TInvitation }>[]
  >([]);
  const [responding, setResponding] = useState<string | null>(null);

  const fetchNotifications = async () => {
    const res = await getUserNotificationsAction();
    setNotifications(
      res.data as TNotification<{ user: IBaseUser; event: IBaseEvent; invitation: TInvitation }>[]
    );
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleAction = async (
    invitationId: string,
    notificationId: string,
    action: "ACCEPT" | "DECLINE"
  ) => {
    setResponding(notificationId + "-" + action);
    try {
      const resp = await fetch("/api/invitations/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invitationId, notificationId, action }),
      });
      if (resp.ok) {
        setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
      }
    } finally {
      setResponding(null);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative outline-none  rounded-full  transition-all">
        <span className="relative flex items-center justify-center w-7 h-7">
          {/* bell icon very small */}
          <Bell
            size={16}
            strokeWidth={2.1}
            className="text-gray-700 group-hover:text-primary transition drop-shadow"
            style={{ display: "block" }}
          />
          {notifications.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 text-xs font-bold text-white bg-emerald-600 border-2 border-white rounded-full flex items-center justify-center shadow-lg select-none">
              {notifications.length > 99 ? "99+" : notifications.length}
            </span>
          )}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[315px] max-h-[335px] rounded-lg shadow-xl border border-neutral-200 bg-white/98 backdrop-blur-sm p-0 ring-1 ring-black/10 overflow-hidden"
        style={{
          scrollbarWidth: "auto",
          scrollbarColor: "#6ee7b7 #f3f4f6"
        }}
      >
        <div className="px-3 py-2 border-b border-zinc-100 sticky top-0 z-10 bg-white/98 flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-900">Notifications</span>
        </div>

        <div
          className="max-h-[260px] overflow-y-scroll custom-scrollbar"
          style={{
            scrollbarWidth: "auto",
            scrollbarColor: "#6ee7b7 #f3f4f6"
          }}
        >
          {notifications.length === 0 ? (
            <div className="py-8 flex flex-col items-center justify-center">
              {/* bell icon very small */}
              <Bell size={16} className="text-zinc-300 mb-1" />
              <span className="text-xs text-zinc-400">No new notifications</span>
            </div>
          ) : (
            <div>
              {notifications.map((n) => {
                const user = (n as any).user as IBaseUser | undefined;
                const event = (n as any).event as IBaseEvent | undefined;
                const invitation = (n as any).invitation as TInvitation | undefined;
                return (
                  <div
                    key={n.id}
                    className="flex gap-2 py-2 px-3 hover:bg-emerald-50/80 transition rounded-md items-start group"
                    style={{ marginBottom: "1px" }}
                  >
                    <div className="flex-shrink-0">
                      <div className="size-8 rounded-full bg-gradient-to-br from-emerald-400/80 to-green-500/90 border-2 border-white shadow flex items-center justify-center">
                        {user?.image ? (
                          <img
                            src={user.image}
                            alt={user.name}
                            className="w-8 h-8 object-cover rounded-full border-2 border-white"
                          />
                        ) : (
                          <UserCircle className="text-white/95 w-5 h-5" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center min-w-0">
                      <div className="flex items-center gap-1 mb-1 flex-wrap">
                        <span className="font-medium text-gray-800 text-xs truncate group-hover:text-emerald-700 transition">
                          {user?.name || "Someone"}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 ml-1 rounded uppercase bg-emerald-50 text-emerald-600 tracking-wider font-medium shadow-sm">
                          {n.type === "INVITATION" ? "Invitation" : "Notification"}
                        </span>
                        {event?.title && (
                          <span className="ml-1 text-[9px] text-gray-400 truncate max-w-[90px]">
                            • {event.title}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-700 whitespace-pre-line break-words leading-snug max-w-[185px]">
                        {n.message}
                      </span>
                      <div className="flex items-center mt-1 gap-1">
                        <span className="text-[10px] text-gray-400">
                          {new Date(n.createdAt).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        {invitation && invitation.status && (
                          <span
                            className={
                              "px-1.5 py-0.5 text-[9px] font-semibold ml-2 rounded capitalize " +
                              (invitation.status === "PENDING"
                                ? "bg-yellow-50 text-yellow-700"
                                : invitation.status === "ACCEPTED"
                                ? "bg-green-50 text-emerald-700"
                                : invitation.status === "DECLINED"
                                ? "bg-red-50 text-red-600"
                                : "bg-gray-50 text-gray-700")
                            }
                          >
                            {invitation.status}
                          </span>
                        )}
                      </div>
                      {invitation?.status === "PENDING" && (
                        <div className="flex gap-2 mt-2">
                          <Button
                            onClick={() => handleAction(invitation!.id, n.id, "ACCEPT")}
                            disabled={responding === n.id + "-ACCEPT"}
                            className="flex-1 rounded-full h-6 px-0 text-xs font-semibold shadow-sm bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 transition text-white outline-none focus:ring-2 focus:ring-emerald-400 min-w-0"
                          >
                            {responding === n.id + "-ACCEPT" ? "Accepting..." : "Accept"}
                          </Button>
                          <Button
                            onClick={() => handleAction(invitation!.id, n.id, "DECLINE")}
                            disabled={responding === n.id + "-DECLINE"}
                            className="flex-1 rounded-full h-6 px-0 text-xs font-semibold shadow-sm bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition text-white outline-none focus:ring-2 focus:ring-pink-400 min-w-0"
                          >
                            {responding === n.id + "-DECLINE" ? "Declining..." : "Decline"}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </DropdownMenuContent>
      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: auto;
          scrollbar-color: #6ee7b7 #f3f4f6;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          background: #f3f4f6;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #6ee7b7;
          border-radius: 8px;
          min-height: 32px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f3f4f6;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: #34d399;
        }
      `}</style>
    </DropdownMenu>
  );
}