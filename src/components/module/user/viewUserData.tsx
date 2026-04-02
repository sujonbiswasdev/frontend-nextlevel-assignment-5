import { IBaseEvent } from '@/types/event.types';
import { IgetReviewData } from '@/types/review.types';
import { IBaseUser, TResponseUserData } from '@/types/user.types';
import React from 'react';

// Updated status enums for display
const USER_STATUS_STYLES: Record<string, { bg: string; text: string; border: string; label: string }> = {
  ACTIVE:    { bg: "bg-green-50",  text: "text-green-700",  border: "border-green-200",  label: "Active" },
  INACTIVE:  { bg: "bg-gray-100",  text: "text-gray-500",   border: "border-gray-300",   label: "Inactive" },
  BLOCKED:   { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", label: "Blocked" },
  DELETED:   { bg: "bg-red-50",    text: "text-red-700",    border: "border-red-200",    label: "Deleted" },
};

const VIEW_DATA_FIELDS = [
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: 'Phone', key: 'phone' },
  { label: 'Role', key: 'role' },
  // Remove old status field, handled with badge below.
  { label: 'Email Verified', key: 'emailVerified' },
];

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

  // Status badge style logic
  const statusStyle = USER_STATUS_STYLES[viewData.status as keyof typeof USER_STATUS_STYLES] || {
    bg: "bg-gray-50",
    text: "text-gray-500",
    border: "border-gray-200",
    label: viewData.status ?? "Unknown"
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-xl px-4 sm:px-6 py-6 space-y-8 overflow-y-scroll">
      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <div className="flex-shrink-0 w-28 h-28 flex items-center justify-center border border-blue-100 rounded-xl bg-gradient-to-tr from-blue-50 to-indigo-50 shadow-inner overflow-hidden">
          {viewData.image ? (
            <img
              src={viewData.image}
              alt={viewData.name || 'User'}
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
                  👤
                </text>
              </svg>
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="mb-1 font-bold text-2xl text-indigo-900 truncate">
            {viewData.name || '-'}
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
                {viewData.email || '-'}
              </span>
            </div>
            {/* Show role and new status badge */}
            <div className="flex items-center gap-2">
              <span className="inline-block px-2 py-[2px] rounded font-semibold text-xs border bg-indigo-50 text-indigo-700 border-indigo-200">
                {viewData.role}
              </span>
              <span
                className={`inline-block px-2 py-[2px] rounded font-semibold text-xs border
                  ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
              >
                {statusStyle.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 text-[15px]">
        {VIEW_DATA_FIELDS.map((field) => (
          <div key={field.key}>
            <span className="text-gray-500 font-medium">{field.label}:</span>
            <span className="block mt-0.5 font-mono text-sm text-gray-700 select-all bg-gray-50 rounded px-2 py-1">
              {field.key === 'emailVerified'?"yes":"no"}
            </span>
          </div>
        ))}

        {/* Render reviews count and events count rather than full arrays */}
        <div>
          <span className="text-gray-500 font-medium">Reviews:</span>
          <span className="block mt-0.5 font-mono text-sm text-gray-700 bg-gray-50 rounded px-2 py-1">
            {viewData.totalReview ?? 0} reviews
          </span>
        </div>

        {/* --- List user's event count (professional, responsive style) --- */}
        <div>
          <span className="text-gray-500 font-medium">Events:</span>
          <span className="block mt-0.5 font-mono text-sm text-gray-700 bg-gray-50 rounded px-2 py-1">
            {Array.isArray(viewData.event) ? viewData.event.length : 0} events
          </span>
        </div>

        {/* --- Professional average rating display --- */}
        <div>
          <span className="text-gray-500 font-medium">Average Rating:</span>
          <span className="flex items-center gap-1 mt-0.5 font-mono text-sm text-yellow-600 bg-gray-50 rounded px-2 py-1">
            {typeof viewData.averageRating === 'number'
              ? viewData.averageRating.toFixed(2)
              : '0.00'}
            <svg
              className="inline-block ml-1"
              width={16}
              height={16}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 15.27L16.18 19l-1.64-7.03L19 7.24l-7.19-.61L10 0 8.19 6.63 1 7.24l5.46 4.73L4.82 19z" />
            </svg>
          </span>
        </div>

        {/* --- Total reviews visual summary --- */}
        <div>
          <span className="text-gray-500 font-medium">Total Reviews:</span>
          <span className="block mt-0.5 font-mono text-sm text-indigo-700 bg-indigo-50 rounded px-2 py-1">
            {viewData.totalReview ?? 0}
          </span>
        </div>

        {/* --- Professional Created At display --- */}
        <div>
          <span className="text-gray-500 font-medium">Created At:</span>
          <span className="block mt-0.5 font-mono text-sm text-blue-700 bg-blue-50 rounded px-2 py-1">
            {viewData.createdAt ? new Date(viewData.createdAt).toLocaleString() : "N/A"}
          </span>
        </div>

        {/* --- Email Verified Status (kept for redundancy, but field is above too) --- */}
        <div>
          <span className="text-gray-500 font-medium">Email Verified:</span>
          <span className={`block mt-0.5 font-mono text-sm rounded px-2 py-1 ${
            viewData.emailVerified
              ? "text-green-700 bg-green-50"
              : "text-red-700 bg-red-50"
          }`}>
            {viewData.emailVerified ? "Yes" : "No"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ViewUserData;