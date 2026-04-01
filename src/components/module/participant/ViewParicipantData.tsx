import { IBaseEvent } from '@/types/event.types';
import { TBaseParticipant, TResponseParticipant } from '@/types/participant.types';
import { IBaseUser } from '@/types/user.types';
import React from 'react';


const ViewParticipantData = ({
  viewMode,
  viewData,
  ispay
}: {
  ispay?:boolean;
  viewMode: boolean;
  viewData?: TResponseParticipant<{ event: IBaseEvent; user: IBaseUser; }>;
}) => {
  return (
    <div>
      {viewMode && viewData && (
        <div className="rounded-2xl border border-gray-100 bg-white shadow-xl px-4 sm:px-6 py-6 space-y-8 overflow-y-scroll">
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <div className="flex-shrink-0 w-28 h-28 flex items-center justify-center border border-blue-100 rounded-xl bg-gradient-to-tr from-blue-50 to-indigo-50 shadow-inner overflow-hidden">
              {viewData.event?.image ? (
                <img
                  src={viewData.event.image}
                  alt={viewData.event?.title ?? 'Event'}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-5xl text-blue-200">
                  <svg width={50} height={50} viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="9" fill="#E0E7FF" />
                    <text
                      x="50%"
                      y="55%"
                      textAnchor="middle"
                      fill="#64748b"
                      fontSize="11"
                      dy=".3em"
                    >
                      🎫
                    </text>
                  </svg>
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="mb-1 font-bold text-2xl text-indigo-900 truncate">
                {viewData.event?.title || '-'}
              </h3>
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">
                    <svg width={18} height={18} fill="none" viewBox="0 0 24 24">
                      <path
                        d="M15 2v2m-6-2v2m-5 4h16M5 6v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6"
                        stroke="#6366F1"
                        strokeWidth={1.3}
                      />
                    </svg>
                  </span>
                  <span className="font-medium text-gray-600">
                    {viewData.event?.date
                      ? new Date(viewData.event.date).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : '-'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">
                    <svg width={18} height={18} fill="none" viewBox="0 0 24 24">
                      <path
                        d="M21 10.5V6a2 2 0 0 0-2-2h-2M3 6a2 2 0 0 1 2-2h2M3 18v-3M16 18h2a2 2 0 0 0 2-2v-2M3 10.5V18c0 1.1.9 2 2 2h2M12 8v4l3 2"
                        stroke="#6366F1"
                        strokeWidth={1.3}
                      />
                    </svg>
                  </span>
                  <span className="font-medium text-gray-600">
                    {viewData.event?.venue || '-'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 text-[15px]">
            <div>
              <span className="text-gray-500 font-medium">Participant ID:</span>
              <span className="block mt-0.5 font-mono text-sm text-gray-700 select-all bg-gray-50 rounded px-2 py-1">
                {viewData.id || '-'}
              </span>
            </div>
            <div>
              <span className="text-gray-500 font-medium">Status:</span>
              {/* Status badge */}
              {(() => {
                const status = viewData.status as unknown as string;
                let badgeClass = "inline-block ml-2 px-2 py-[2px] rounded font-semibold text-xs border";
                let badgeText = status;
                if (status === "PENDING") {
                  badgeClass += " bg-yellow-50 text-yellow-700 border-yellow-200";
                } else if (status === "APPROVED") {
                  badgeClass += " bg-green-50 text-green-700 border-green-200";
                } else if (status === "REJECTED") {
                  badgeClass += " bg-red-50 text-red-700 border-red-200";
                } else if (status === "BANNED") {
                  badgeClass += " bg-gray-800 text-white border-gray-600";
                } else {
                  badgeClass += " bg-gray-50 text-gray-500 border";
                }
                return (
                  <span className={badgeClass}>
                    {badgeText}
                  </span>
                );
              })()}
            </div>
            <div>
              <span className="text-gray-500 font-medium">Participant:</span>
              <span className="block mt-0.5 text-gray-800 font-semibold">
                {viewData.user?.name ?? viewData.userId ?? '-'}
              </span>
            </div>
            <div>
              <span className="text-gray-500 font-medium">Payment Status:</span>
              <span className="block mt-0.5">
                {viewData.paymentStatus}
              </span>
            </div>

            <div>
              <span className="text-gray-500 font-medium">Email:</span>
              <span className="block mt-0.5">{viewData.user.email}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-gray-500 font-medium">Joined At:</span>
              <span className="block mt-0.5">
                {viewData.joinedAt
                  ? new Date(viewData.joinedAt).toLocaleString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : '-'}
              </span>
            </div>

            {ispay ? (
              <div className="flex items-center sm:col-span-2">
                <button
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg cursor-pointer bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-800 text-white text-base font-semibold shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-700"
                  style={{ minWidth: "140px", letterSpacing: "0.01rem" }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a5 5 0 00-10 0v2m2 8h6M12 17v1m-6-3h12a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                  </svg>
                  Pay Now
                </button>
              </div>
            ) : null}
            
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewParticipantData;