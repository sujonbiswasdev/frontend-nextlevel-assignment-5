import { IBaseEvent } from '@/types/event.types';
import { IgetReviewData } from '@/types/review.types';
import { IBaseUser, TResponseUserData } from '@/types/user.types';
import React from 'react';

// Professional status badge styling
const USER_STATUS_STYLES: Record<string, { bg: string; text: string; border: string; label: string }> = {
  ACTIVE:    { bg: "bg-green-100",  text: "text-green-800",  border: "border-green-300",  label: "Active" },
  INACTIVE:  { bg: "bg-gray-100",   text: "text-gray-500",   border: "border-gray-300",   label: "Inactive" },
  BLOCKED:   { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-300", label: "Blocked" },
  DELETED:   { bg: "bg-red-100",    text: "text-red-700",    border: "border-red-300",    label: "Deleted" },
};

const ViewUserData = ({
  viewMode,
  viewData,
}: {
  viewMode: boolean;
  viewData?: TResponseUserData<{ reviews: IgetReviewData[], event: IBaseEvent[] }>;
}) => {
  if (!viewMode || !viewData) {
    return null;
  }

  const statusStyle =
    USER_STATUS_STYLES[viewData.status as keyof typeof USER_STATUS_STYLES] || {
      bg: "bg-gray-100",
      text: "text-gray-500",
      border: "border-gray-200",
      label: viewData.status ?? "Unknown",
    };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-2xl rounded-3xl border border-slate-200 overflow-hidden">
      {/* Top Section: Avatar, Name, Email, Status */}
      <div className="flex flex-col md:flex-row items-center md:items-start px-6 py-8 gap-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-transparent">
        {/* Avatar area */}
        <div className="flex-shrink-0 flex justify-center items-center w-32 h-32 rounded-full shadow-lg bg-white border-4 border-indigo-200">
          {viewData.image ? (
            <img
              src={viewData.image}
              alt={viewData.name || 'User'}
              className="object-cover w-full h-full rounded-full"
            />
          ) : (
            <span className="text-indigo-300 text-6xl select-none">👤</span>
          )}
        </div>
        {/* Basic info */}
        <div className="flex-1 w-full min-w-0">
          <div className="flex flex-col gap-2">
            <span className="font-black text-3xl text-indigo-800 truncate break-all">{viewData.name || '-'}</span>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-1 font-medium text-gray-600 text-base">
                <svg width={18} height={18} fill="none" viewBox="0 0 24 24">
                  <path
                    d="M15 2v2m-6-2v2m-5 4h16M5 6v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6"
                    stroke="#6366F1"
                    strokeWidth={1.3}
                  />
                </svg>{viewData.email || '-'}
              </span>
              <span className={`px-2 py-1 rounded-full font-semibold text-xs border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                {statusStyle.label}
              </span>
              <span className="px-2 py-1 rounded-full font-semibold text-xs border bg-indigo-50 text-indigo-700 border-indigo-200">
                {viewData.role}
              </span>
              <span className={
                `px-2 py-1 rounded-full font-semibold text-xs border 
                ${viewData.emailVerified ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'}`
              }>
                {viewData.emailVerified ? "Email Verified" : "Email Not Verified"}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="inline-block text-slate-400 text-sm">
                Joined: <span className="text-blue-800">{viewData.createdAt ? new Date(viewData.createdAt).toLocaleString() : "N/A"}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-indigo-100 to-transparent" />

      {/* Detail Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 px-6 py-8 bg-white">
        {/* Phone */}
        <div className="flex flex-col gap-1">
          <span className="text-slate-500 text-sm font-medium mb-1">Phone</span>
          <span className="font-mono text-base text-gray-800 bg-gray-50 rounded-lg px-3 py-2 block border border-slate-100">
            {viewData.phone || '—'}
          </span>
        </div>
        {/* Average Rating */}
        <div className="flex flex-col gap-1">
          <span className="text-slate-500 text-sm font-medium mb-1">Average Rating</span>
          <span className="flex items-center font-mono text-base text-yellow-700 bg-yellow-50 rounded-lg px-3 py-2 border border-yellow-100 gap-2">
            {typeof viewData.averageRating === 'number' ? viewData.averageRating.toFixed(2) : '0.00'}
            <svg className="inline" width={18} height={18} fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 15.27L16.18 19l-1.64-7.03L19 7.24l-7.19-.61L10 0 8.19 6.63 1 7.24l5.46 4.73L4.82 19z" />
            </svg>
          </span>
        </div>
        {/* Events Count */}
        <div className="flex flex-col gap-1">
          <span className="text-slate-500 text-sm font-medium mb-1">Events</span>
          <span className="font-mono text-base text-indigo-700 bg-indigo-50 rounded-lg px-3 py-2 border border-indigo-100">
            {Array.isArray(viewData.event) ? viewData.event.length : 0}
          </span>
        </div>
        {/* Reviews (shown as "X reviews") */}
        <div className="flex flex-col gap-1">
          <span className="text-slate-500 text-sm font-medium mb-1">Total Reviews</span>
          <span className="font-mono text-base text-indigo-700 bg-indigo-50 rounded-lg px-3 py-2 border border-indigo-100">
            {viewData.totalReview ?? 0}
          </span>
        </div>
        {/* Email Verified (redundant, still display for clarity) */}
        <div className="flex flex-col gap-1">
          <span className="text-slate-500 text-sm font-medium mb-1">Email Verified</span>
          <span className={`font-mono text-base rounded-lg px-3 py-2 border ${viewData.emailVerified
            ? "text-green-700 bg-green-50 border-green-100"
            : "text-red-700 bg-red-50 border-red-100"
            }`}>
            {viewData.emailVerified ? "Yes" : "No"}
          </span>
        </div>
        {/* Created At as ISO date */}
        <div className="flex flex-col gap-1">
          <span className="text-slate-500 text-sm font-medium mb-1">Created At</span>
          <span className="font-mono text-base text-gray-700 bg-gray-50 rounded-lg px-3 py-2 border border-slate-100">
            {viewData.createdAt ? new Date(viewData.createdAt).toLocaleDateString() : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ViewUserData;