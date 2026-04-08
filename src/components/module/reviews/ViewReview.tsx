import React from "react";
import { format } from "date-fns";
import CopyableId from "@/components/shared/CopyId";

// Amar data structure hocche:
/*
  {
    id: string;
    userId: string;
    eventId: string;
    rating: number;
    comment: string;
    parentId?: string | null;
    status: "PENDING" | "APPROVED" | "REJECTED";
    createdAt: string;
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
    };
    event: {
      id: string;
      title: string;
      date: string;
      venue?: string;
    };
    replies: []; // nested naa, ekhon use kortesi na
  }
*/

interface ViewReviewDataProps {
  viewData: {
    id: string;
    userId: string;
    eventId: string;
    rating: number;
    comment: string;
    parentId?: string | null;
    status: "PENDING" | "APPROVED" | "REJECTED";
    createdAt: string;
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
    };
    event: {
      id: string;
      title: string;
      date: string;
      venue?: string;
    };
    replies?: any[];
  };
}

const statusColors: Record<string, string> = {
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
  PENDING: "bg-yellow-100 text-yellow-700",
};

const ViewReviewData: React.FC<ViewReviewDataProps> = ({ viewData }) => {
  if (!viewData) return null;

  const { id, userId, eventId, rating, comment, status, createdAt, user, event } = viewData;

  return (
    <div className="px-4 md:px-10 py-4 space-y-8">
      {/* Review Overview */}
      <section className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-indigo-800 dark:text-indigo-200 mb-1 tracking-tight">
          Review Details
        </h2>
        <ul className="divide-y divide-gray-100 dark:divide-gray-800">
          <li className="flex justify-between py-1">
            <span className="font-semibold text-gray-600 dark:text-gray-300">Review ID</span>
            <span className="font-mono text-gray-900 dark:text-gray-100 break-all">{id}</span>
          </li>
          <li className="flex justify-between py-1">
            <span className="font-semibold text-gray-600 dark:text-gray-300">User ID</span>
            <CopyableId id={userId} href={`/profile/${userId}`} showShort={userId as any}></CopyableId>
          </li>
          <li className="flex justify-between py-1">
            <span className="font-semibold text-gray-600 dark:text-gray-300">Event ID</span>
            <CopyableId id={eventId} href={`/events/${eventId}`} showShort={eventId as any}></CopyableId>
          </li>
          <li className="flex justify-between py-1">
            <span className="font-semibold text-gray-600 dark:text-gray-300">Status</span>
            <span
              className={`inline-block px-2 py-0.5 rounded-lg text-xs font-bold uppercase ${statusColors[status] || "bg-gray-100 text-gray-600"}`}>
              {status}
            </span>
          </li>
          <li className="flex justify-between py-1">
            <span className="font-semibold text-gray-600 dark:text-gray-300">Created At</span>
            <span className="text-gray-900 dark:text-gray-100">
              {createdAt ? format(new Date(createdAt), "dd/MM/yyyy HH:mm") : "-"}
            </span>
          </li>
          <li className="flex justify-between py-1">
            <span className="font-semibold text-gray-600 dark:text-gray-300">Rating</span>
            <span className="text-yellow-600 dark:text-yellow-400 font-bold">{rating} / 5</span>
          </li>
        </ul>
        <div>
          <span className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-0.5">Comment</span>
          <div className="text-base text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3">{comment}</div>
        </div>
      </section>

      {/* User Info */}
      <section className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-sky-800 dark:text-sky-200 mb-1 tracking-tight">
          User Details
        </h2>
        <div className="flex items-center gap-6">
          {user?.image && (
            <img
              src={user.image}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover border shadow"
            />
          )}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <span className="font-semibold text-gray-600 dark:text-gray-300">Name</span>
              <div className="text-gray-900 dark:text-gray-100">{user?.name ?? "-"}</div>
            </div>
            <div>
              <span className="font-semibold text-gray-600 dark:text-gray-300">Email</span>
              <div className="text-gray-900 dark:text-gray-100 break-all">{user?.email ?? "-"}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Info */}
      <section className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-yellow-700 dark:text-yellow-300 mb-1 tracking-tight">
          Event Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <span className="font-semibold text-gray-600 dark:text-gray-300">Title</span>
            <div className="text-gray-900 dark:text-gray-100">{event?.title ?? "-"}</div>
          </div>
          <div>
            <span className="font-semibold text-gray-600 dark:text-gray-300">Date</span>
            <div className="text-gray-900 dark:text-gray-100">
              {event?.date ? format(new Date(event.date), "dd/MM/yyyy") : "-"}
            </div>
          </div>
          <div>
            <span className="font-semibold text-gray-600 dark:text-gray-300">Venue</span>
            <div className="text-gray-900 dark:text-gray-100">{event?.venue ?? "-"}</div>
          </div>
          <div>
            <span className="font-semibold text-gray-600 dark:text-gray-300">Event ID</span>
            <div className="text-gray-900 dark:text-gray-100 break-all">{event?.id ?? "-"}</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewReviewData;