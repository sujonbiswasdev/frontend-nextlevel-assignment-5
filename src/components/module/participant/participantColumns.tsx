import CopyableId from "@/components/shared/CopyId";

export const createParticipantColumns = () => [
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
        href={row.eventId ? `/events/${row.eventId}` : undefined}
        showShort={row.eventId?.slice(0, 8)}
      />
    ),
  },
  {
    key: "userId",
    label: "User",
    render: (row: any) => (
      <CopyableId
        id={row.userId}
        href={row.userId ? `/profile/${row.userId}` : undefined}
        showShort={row.userId?.slice(0, 8)}
      />
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
        case "APPROVED":
          color = "bg-green-100 text-green-800";
          text = "Approved";
          break;
        case "REJECTED":
          color = "bg-red-100 text-red-800";
          text = "Rejected";
          break;
        case "BANNED":
          color = "bg-gray-800 text-white border-gray-600";
          text = "Banned";
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
    key: "paymentStatus",
    label: "Payment",
    render: (row: any) => {
      let color = "";
      let text = "";
      switch (row.paymentStatus) {
        case "PAID":
          color = "bg-green-100 text-green-800";
          text = "Paid";
          break;
        case "UNPAID":
          color = "bg-red-100 text-red-800";
          text = "Unpaid";
          break;
        case "FREE":
          color = "bg-gray-100 text-gray-800";
          text = "Free";
          break;
        default:
          color = "bg-gray-50 text-gray-400";
          text = "N/A";
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
    key: "joinedAt",
    label: "Joined At",
    render: (row: any) =>
      row.joinedAt ? (
        <span
          className="text-gray-600"
          title={new Date(row.joinedAt).toLocaleString()}
        >
          {new Date(row.joinedAt).toLocaleDateString(undefined, {
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