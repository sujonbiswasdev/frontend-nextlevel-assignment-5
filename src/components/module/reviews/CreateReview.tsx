"use client";

import { useState } from "react";
import { Star, Send } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { createReview } from "@/actions/review.actions";

interface Props {
  eventId: string;
  parentId?: string; // Changed to only string | undefined
  onSuccess?: (review: any) => void;
  defaultRating?: number;
  defaultComment?: string;
}

export default function ReviewForm({
  eventId,
  parentId, // no longer defaults to null
  onSuccess,
  defaultRating = 0,
  defaultComment = "",
}: Props) {
  const router = useRouter();

  const [rating, setRating] = useState(defaultRating);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState(defaultComment);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setRating(0);
    setComment("");
    setHover(0);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.warning("Comment is required");
      return;
    }

    if (rating < 1) {
      toast.warning("Please select at least 1 star");
      return;
    }

    try {
      setLoading(true);

      // Omit parentId if it's undefined
      const reviewData: { rating: number; comment: string; parentId?: string } = {
        rating,
        comment,
      };
      if (parentId !== undefined) {
        reviewData.parentId = parentId;
      }

      const res = await createReview(eventId, reviewData);

      if (!res.success) {
        toast.error(res.message || "Failed to add review");
        return;
      }

      toast.success(res.message || "Review added successfully");

      // Defensive: some API responses may not have .data
      if ("data" in res && res.data !== undefined) {
        onSuccess?.(res.data);
      } else {
        onSuccess?.(undefined);
      }
      resetForm();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-2xl shadow-md space-y-4"
    >
      {/* ⭐ Star Rating */}
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => {
          const active = (hover || rating) >= star;

          return (
            <Star
              key={star}
              size={24}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className={`cursor-pointer transition-all duration-200 ${
                active
                  ? "text-yellow-400 fill-yellow-400 scale-110"
                  : "text-gray-300"
              }`}
            />
          );
        })}
      </div>

      {/* 💬 Comment Box */}
      <div className="relative">
        <textarea
          placeholder={
            parentId ? "Write a reply..." : "Write your review..."
          }
          className="w-full border rounded-xl p-3 pr-12 resize-none focus:ring-2 focus:ring-orange-400 outline-none"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="absolute right-3 bottom-3 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full transition disabled:opacity-50"
        >
          {loading ? (
            <span className="text-xs px-1">...</span>
          ) : (
            <Send size={16} />
          )}
        </button>
      </div>
    </form>
  );
}