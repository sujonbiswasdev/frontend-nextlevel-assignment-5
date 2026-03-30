"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ReviewForm from "./CreateReview";
import { IBaseEvent } from "@/types/event.types";
import { TResponseReviewData } from "@/types/review.types";
import { IBaseUser } from "@/types/user.types";

interface ReviewItemProps {
  user: IBaseUser;
  review: TResponseReviewData<{ user: IBaseUser; event: IBaseEvent }>;
  event: IBaseEvent;
  activeReplyId: string | null;
  setActiveReplyId: (id: string | null) => void;
  depth?: number;
  maxDepth?: number;
}

export default function ReviewItem({
  user,
  review,
  event,
  activeReplyId,
  setActiveReplyId,
  depth = 0,
  maxDepth = 2, // Facebook-style max nested reply
}: ReviewItemProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  // Safe replies
  const replies = review.replies || [];

  const canReply = depth < maxDepth;
  const isOwner = user?.id === review.user?.id;

  return (
    <div
      className={`flex gap-3 mt-3 ${depth > 0 ? "ml-8" : ""}`}
      style={{ alignItems: "flex-start" }}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 relative">
          <Image
            src={review.user?.image || "/default.png"}
            alt={review.user?.name || "User"}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex-1">
        {/* Review Bubble */}
        <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-2xl min-w-0">
          <div className="flex items-center gap-1 mb-0.5">
            <span className="font-semibold text-xs text-gray-800 dark:text-gray-200">{review.user?.name || "User"}</span>
            {review.rating && (
              <span className="text-orange-500 text-xs font-medium ml-1">{review.rating.toFixed(1)}</span>
            )}
          </div>
          {isEditing ? (
            <input
              className="mt-0 w-full text-xs px-2 py-1 border rounded"
              value={review.comment}
              onChange={() => {}}
              // Add handleUpdate logic here if needed
            />
          ) : (
            <p className="text-gray-600 dark:text-gray-200 mt-0 text-xs break-words">{review.comment}</p>
          )}
        </div>

        {/* Actions like Facebook style: small, subtle, row, spaced out, on the side (bottom left of bubble) */}
        <div className="flex gap-3 mt-1 pl-1">
          {canReply && (
            <button
              className="text-[11px] text-blue-500 font-semibold hover:underline focus:outline-none"
              style={{ fontSize: "10.5px" }}
              onClick={() => setActiveReplyId(activeReplyId === review.id ? null : review.id)}
            >
              Reply
            </button>
          )}
          {isOwner && (
            <>
              <button
                className="text-[11px] text-gray-500 font-semibold hover:underline focus:outline-none"
                style={{ fontSize: "10.5px" }}
                onClick={() => setIsEditing(!isEditing)}
              >
                Edit
              </button>
              {/* Delete button can go here if needed */}
            </>
          )}
        </div>

        {/* Reply Form */}
        {activeReplyId === review.id && (
          <div className="mt-1">
            <ReviewForm parentId={review.id} eventId={event.id} />
          </div>
        )}

        {/* Nested Replies */}
        {replies.length > 0 && (
          <div className="ml-6 pl-4 border-l border-gray-200 dark:border-gray-700">
            {replies.map((reply) => (
              <ReviewItem
                key={reply.id}
                user={user}
                review={reply as any}
                event={event}
                activeReplyId={activeReplyId}
                setActiveReplyId={setActiveReplyId}
                depth={depth + 1}
                maxDepth={maxDepth}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}