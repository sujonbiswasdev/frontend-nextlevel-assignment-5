import CopyableId from "@/components/shared/CopyId";

// High-quality, modern, and responsive invitation columns
export const createInvitationColumns = () => [
  {
    key: "id",
    label: "Invitation ID",
    render: (row:any) => (
      <span className="block rounded-lg bg-gradient-to-r from-blue-100 to-blue-50 px-2 py-1 font-semibold text-blue-700 text-[13px] tracking-wide shadow-sm max-w-[120px] mx-auto overflow-x-auto">
        <CopyableId id={row.id} showShort={row.id.slice(0, 6)} />
      </span>
    ),
  },
  {
    key: "eventId",
    label: "Event",
    render: (row: any) => (
      <span className="block rounded-lg bg-gradient-to-r from-purple-100 to-purple-50 px-2 py-1 font-semibold text-purple-700 text-[13px] tracking-wide shadow-sm max-w-[120px] mx-auto overflow-x-auto">
        <CopyableId id={row.eventId} href={`/events/${row.eventId}`} showShort={row.eventId.slice(0, 6)} />
      </span>
    ),
  },
  {
    key: "inviterId",
    label: "Inviter",
    render: (row: any) => (
      <span className="block rounded-lg bg-gradient-to-r from-cyan-100 to-teal-50 px-2 py-1 font-semibold text-teal-700 text-[13px] tracking-wide shadow-sm max-w-[120px] mx-auto overflow-x-auto">
        <CopyableId id={row.inviterId} showShort={row.inviterId.slice(0, 6)} />
      </span>
    ),
  },
  {
    key: "inviteeId",
    label: "Invitee",
    render: (row: any) => (
      <span className="block rounded-lg bg-gradient-to-r from-pink-100 to-fuchsia-50 px-2 py-1 font-semibold text-fuchsia-700 text-[13px] tracking-wide shadow-sm max-w-[120px] mx-auto overflow-x-auto">
        <CopyableId id={row.inviteeId} showShort={row.inviteeId.slice(0, 6)} />
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (row: any) => {
      switch (row.status) {
        case "PENDING":
          return (
            <span className="inline-block rounded-full bg-yellow-200 text-yellow-800 font-bold text-xs md:text-sm px-4 py-1 text-center w-full max-w-[110px] mx-auto shadow">
              Pending
            </span>
          );
        case "ACCEPTED":
          return (
            <span className="inline-block rounded-full bg-green-200 text-green-800 font-bold text-xs md:text-sm px-4 py-1 text-center w-full max-w-[110px] mx-auto shadow">
              Accepted
            </span>
          );
        case "DECLINED":
          return (
            <span className="inline-block rounded-full bg-red-200 text-red-700 font-bold text-xs md:text-sm px-4 py-1 text-center w-full max-w-[110px] mx-auto shadow">
              Declined
            </span>
          );
        default:
          return (
            <span className="inline-block rounded-full bg-gray-200 text-gray-700 font-semibold text-xs md:text-sm px-4 py-1 text-center w-full max-w-[110px] mx-auto shadow">
              {row.status}
            </span>
          );
      }
    },
  },
  {
    key: "message",
    label: "Message",
    render: (row: any) =>
      row.message ? (
        <span className="block rounded bg-pink-50 px-2 py-1 text-pink-700 text-sm md:text-base truncate max-w-xs font-medium shadow-sm">
          {row.message}
        </span>
      ) : (
        <span className="italic text-gray-400 text-sm md:text-base">No message</span>
      ),
  },
  {
    key: "createdAt",
    label: "Invited At",
    render: (row: any) =>
      row.createdAt ? (
        <span className="block rounded bg-gray-50 px-2 py-1 text-gray-700 text-xs md:text-sm font-medium">
          {new Date(row.createdAt).toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      ) : (
        <span className="text-gray-300">--</span>
      ),
  },
];