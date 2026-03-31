import CopyableId from "@/components/shared/CopyId";

export const createParticipantColumns = (router: any) => [
  {
    key: "id",
    label: "ID",
    render: (p: any) => { return <CopyableId id={p.id} href={`/events/${p.id}`} />},
  },
  {
    key: "userId",
    label: "User",
    render: (p: any) => (
      <span className="px-2 py-1 rounded bg-indigo-100 text-indigo-700">
        {p.userId.slice(0, 5)}...
      </span>
    ),
  },
  {
    key: "eventId",
    label: "Event",
    render: (p: any) => (
      <button
        className="text-indigo-600"
        onClick={() => router.push(`/events/${p.eventId}`)}
      >
        {p.eventId.slice(0, 5)}...
      </button>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (p: any) => (
      <span className={
        p.status === "PENDING"
          ? "text-yellow-500"
          : p.status === "APPROVED"
            ? "text-green-500"
            : p.status === "REJECTED"
              ? "text-red-500"
              : p.status === "BANNED"
                ? "text-purple-700"
                : "text-gray-500"
      }>
        {p.status}
      </span>
    ),
  },
  {
    key: "paymentStatus",
    label: "Payment",
    render: (p: any) => {
      switch (p.paymentStatus) {
        case 'PAID':
          return (
            <span className="text-xs sm:text-sm inline-block px-2 py-1 rounded bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 font-semibold min-w-[40px]">
              PAID
            </span>
          );
        case 'UNPAID':
          return (
            <span className="text-xs sm:text-sm inline-block px-2 py-1 rounded bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 font-semibold min-w-[46px]">
              UNPAID
            </span>
          );
        case 'FREE':
          return (
            <span className="text-xs sm:text-sm inline-block px-2 py-1 rounded bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-200 font-semibold min-w-[80px]">
              FREE atake kore daw
            </span>
          );
        default:
          return <span className="text-xs sm:text-sm text-gray-400">N/A</span>;
      }
    },
  },
  {
    key: "joinedAt",
    label: "Joined At",
    render: (p: any) => (
      <span>
        {p.joinedAt
          ? new Date(p.joinedAt).toLocaleString()
          : "N/A"}
      </span>
    ),
  },
];