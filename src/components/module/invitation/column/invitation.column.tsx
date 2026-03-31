import CopyableId from "@/components/shared/CopyId";

export const createInvitationColumns = () => [
  {
    key: "id",
    label: "ID",
    render: (row: any) => (
      <CopyableId id={row.id} showShort={row.id.slice(0, 8)} />
    ),
  },
  {
    key: "eventId",
    label: "Event",
    render: (row: any) => (
      <CopyableId
        id={row.eventId}
        href={`/events/${row.eventId}`}
        showShort={row.eventId.slice(0, 8)}
      />
    ),
  },
  {
    key: "inviterId",
    label: "Inviter",
    render: (row: any) => (
      <CopyableId id={row.inviterId} showShort={row.inviterId.slice(0, 8)} />
    ),
  },
  {
    key: "inviteeId",
    label: "Invitee",
    render: (row: any) => (
      <CopyableId id={row.inviteeId} showShort={row.inviteeId.slice(0, 8)} />
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (row: any) => {
      let color = "";
      let text = "";
      switch (row.status) {
        case "PENDING":
          color = "bg-yellow-100 text-yellow-800";
          text = "Pending";
          break;
        case "ACCEPTED":
          color = "bg-green-100 text-green-800";
          text = "Accepted";
          break;
        case "DECLINED":
          color = "bg-red-100 text-red-800";
          text = "Declined";
          break;
        default:
          color = "bg-gray-100 text-gray-800";
          text = row.status;
      }
      return (
        <span
          className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${color}`}
        >
          {text}
        </span>
      );
    },
  },
  {
    key: "message",
    label: "Message",
    render: (row: any) =>
      row.message ? (
        <span
          className="truncate max-w-[180px] block text-gray-800"
          title={row.message}
        >
          {row.message.length > 45
            ? row.message.slice(0, 45) + "..."
            : row.message}
        </span>
      ) : (
        <span className="text-gray-400 italic">No message</span>
      ),
  },
  {
    key: "createdAt",
    label: "Invited At",
    render: (row: any) =>
      row.createdAt ? (
        <span
          className="text-gray-600"
          title={new Date(row.createdAt).toLocaleString()}
        >
          {new Date(row.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      ) : (
        <span className="text-gray-400">--</span>
      ),
  },
];