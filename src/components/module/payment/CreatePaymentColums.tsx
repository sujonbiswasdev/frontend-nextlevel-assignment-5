import CopyableId from "@/components/shared/CopyId";
import { format } from "date-fns";
import { TResponsePayment } from "@/types/payment.types";

export const createPaymentColumns = () => [
  {
    key: "id",
    label: "ID",
    render: (row: TResponsePayment<any>) => (
      <CopyableId id={row.id} showShort={row.id?.slice(0, 8)} />
    ),
  },
  {
    key: "eventId",
    label: "Event",
    render: (row: TResponsePayment<any>) => (
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
    render: (row: TResponsePayment<any>) => (
      <CopyableId
        id={row.userId}
        href={row.userId ? `/profile/${row.userId}` : undefined}
        showShort={row.userId?.slice(0, 8)}
      />
    ),
  },
  {
    key: "participantId",
    label: "Participant",
    render: (row: TResponsePayment<any>) => (
      <CopyableId
        id={row.participantId}
        showShort={row.participantId?.slice(0, 8)}
      />
    ),
  },
  {
    key: "amount",
    label: "Amount",
    render: (row: TResponsePayment<any>) => (
      <span className="text-gray-900 dark:text-gray-100">${row.amount}</span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (row: TResponsePayment<any>) => {
      let color = "";
      let text = "";
      switch (row.status) {
        case "PAID":
          color = "bg-green-100 text-green-800";
          text = "Paid";
          break;
        case "UNPAID":
          color = "bg-red-100 text-red-800";
          text = "Unpaid";
          break;
        case "REFUNDED":
          color = "bg-yellow-100 text-yellow-800";
          text = "Refunded";
          break;
        default:
          color = "bg-gray-50 text-gray-400";
          text = row.status || "N/A";
      }
      return (
        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${color}`}>
          {text}
        </span>
      );
    },
  },
  {
    key: "createdAt",
    label: "Created At",
    render: (row: TResponsePayment<any>) =>
      row.createdAt ? (
        <span
          className="text-gray-600"
          title={new Date(row.createdAt).toLocaleString()}
        >
          {format(new Date(row.createdAt), "dd/MM/yyyy HH:mm")}
        </span>
      ) : (
        <span className="text-gray-400">--</span>
      ),
  },
];