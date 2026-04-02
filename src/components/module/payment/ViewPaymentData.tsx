import React from "react";
import { IBaseEvent } from "@/types/event.types";
import { TBaseParticipant } from "@/types/participant.types";
import { TResponsePayment } from "@/types/payment.types";
import { format } from "date-fns";

interface ViewPaymentDataProps {
  viewData: TResponsePayment<{ event: IBaseEvent; participant: TBaseParticipant }>;
}

const ViewPaymentData: React.FC<ViewPaymentDataProps> = ({ viewData }) => {
  if (!viewData) return null;

  const { id, userId, event, participant, amount, status } = viewData;

  return (
    <div className="space-y-4">
      {/* Payment Info */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Payment Information
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">Payment ID:</p>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{id}</p>

          <p className="text-sm text-gray-500 dark:text-gray-400">User ID:</p>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{userId}</p>

          <p className="text-sm text-gray-500 dark:text-gray-400">Amount:</p>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">${amount}</p>

          <p className="text-sm text-gray-500 dark:text-gray-400">Status:</p>
          <p className={`text-sm font-medium ${
            status === "PAID" ? "text-green-600" : status === "UNPAID" ? "text-red-500" : "text-yellow-500"
          }`}>
            {status}
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400">Created At:</p>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {/* {format(new Date(createdAt), "dd/MM/yyyy HH:mm")} */}
          </p>
        </div>
      </div>

      {/* Event Info */}
      {event && (
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Event Information
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">Event ID:</p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{event.id}</p>

            <p className="text-sm text-gray-500 dark:text-gray-400">Event Name:</p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{viewData.event.title}</p>

            <p className="text-sm text-gray-500 dark:text-gray-400">Date:</p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {event.date ? format(new Date(event.date), "dd/MM/yyyy") : "-"}
            </p>
          </div>
        </div>
      )}

      {/* Participant Info */}
      {participant && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Participant Information
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">Participant ID:</p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{participant.id}</p>
{/* 
            <p className="text-sm text-gray-500 dark:text-gray-400">Name:</p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{participant.}</p>

            <p className="text-sm text-gray-500 dark:text-gray-400">Email:</p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{participant}</p> */}

            {/* <p className="text-sm text-gray-500 dark:text-gray-400">Phone:</p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{participant.phone}</p> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPaymentData;