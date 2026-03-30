"use client";

import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Star, Trash2, Edit3, MessageSquare, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

// Shadcn UI Imports (Assuming these exist in your components/ui folder)
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

interface Review {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  userName: string;
  createdAt: string; // ISO String
}

interface EventReviewsProps {
  eventId: string;
  currentUserId: string; // From your Auth Context/JWT
}

export default function EventReviews({ eventId, currentUserId }: EventReviewsProps) {
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const REVIEW_PERIOD_DAYS = 7;

  // --- 1. Fetch Reviews ---
  const { data: reviews, isLoading } = useQuery<Review[]>({
    queryKey: ["reviews", eventId],
    queryFn: async () => {
      const res = await fetch(`/api/events/${eventId}/reviews`);
      if (!res.ok) throw new Error("Failed to fetch reviews");
      return res.json();
    },
  });

  // --- 2. Create/Update Mutation ---
  const upsertMutation = useMutation({
    mutationFn: async (payload: { rating: number; comment: string; reviewId?: string }) => {
      const url = payload.reviewId ? `/api/reviews/${payload.reviewId}` : `/api/events/${eventId}/reviews`;
      const method = payload.reviewId ? "PATCH" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Operation failed");
      return res.json();
    },
    onSuccess: () => {
      toast.success(editingReview ? "Review updated!" : "Review posted!");
      setRating(0);
      setComment("");
      setEditingReview(null);
      queryClient.invalidateQueries({ queryKey: ["reviews", eventId] });
    },
    onError: () => toast.error("Something went wrong"),
  });

  // --- 3. Delete Mutation ---
  const deleteMutation = useMutation({
    mutationFn: async (reviewId: string) => {
      const res = await fetch(`/api/reviews/${reviewId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
    },
    onSuccess: () => {
      toast.warn("Review deleted");
      queryClient.invalidateQueries({ queryKey: ["reviews", eventId] });
    },
  });

  // --- Helper: Check if Review Period is Active ---
  const canModify = (createdAt: string) => {
    const createdDate = new Date(createdAt).getTime();
    const now = new Date().getTime();
    const diffDays = (now - createdDate) / (1000 * 60 * 60 * 24);
    return diffDays <= REVIEW_PERIOD_DAYS;
  };

  const handleEditClick = (review: Review) => {
    setEditingReview(review);
    setRating(review.rating);
    setComment(review.comment);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-[1480px] mx-auto space-y-10 py-6">
      {/* SECTION: REVIEW FORM */}
      <Card className="border-slate-200 shadow-md rounded-2xl overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <MessageSquare size={20} className="text-blue-600" />
            {editingReview ? "Edit Your Review" : "Rate this Event"}
          </h3>
        </div>
        <CardContent className="p-6">
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`transition-transform hover:scale-110 ${
                  star <= rating ? "text-amber-400 fill-amber-400" : "text-slate-300"
                }`}
              >
                <Star size={32} />
              </button>
            ))}
          </div>

          <Textarea
            placeholder="Write your honest experience here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[120px] mb-4 border-slate-200 focus:ring-blue-600 rounded-xl"
          />

          <div className="flex justify-between items-center">
            <p className="text-xs text-slate-400">
              {editingReview ? "Editing mode active" : "Your review helps others decide."}
            </p>
            <div className="flex gap-2">
              {editingReview && (
                <Button variant="outline" onClick={() => { setEditingReview(null); setRating(0); setComment(""); }}>
                  Cancel
                </Button>
              )}
              <Button
                onClick={() => upsertMutation.mutate({ rating, comment, reviewId: editingReview?.id })}
                disabled={!rating || !comment || upsertMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700 px-8 rounded-xl font-bold transition-all"
              >
                {upsertMutation.isPending ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
                {editingReview ? "Update Review" : "Submit Review"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SECTION: REVIEWS LIST */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          Guest Reviews 
          <span className="text-sm font-medium bg-slate-100 text-slate-500 px-3 py-1 rounded-full">
            {reviews?.length || 0}
          </span>
        </h2>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" size={40} /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews?.map((review) => {
              const isOwner = review.userId === currentUserId;
              const editable = canModify(review.createdAt);

              return (
                <div key={review.id} className="bg-white border border-slate-200 p-6 rounded-2xl hover:shadow-lg transition-shadow relative group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-blue-600 border border-blue-50">
                        {review.userName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{review.userName}</h4>
                        <p className="text-xs text-slate-400">{new Date(review.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} className="fill-amber-400" />)}
                    </div>
                  </div>

                  <p className="text-slate-600 leading-relaxed text-sm mb-6 italic">"{review.comment}"</p>

                  {isOwner && (
                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                      {editable ? (
                        <div className="flex gap-4">
                          <button 
                            onClick={() => handleEditClick(review)}
                            className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition"
                          >
                            <Edit3 size={14} /> Edit
                          </button>
                          <button 
                            onClick={() => { if(confirm("Delete review?")) deleteMutation.mutate(review.id) }}
                            className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-700 transition"
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                          <AlertCircle size={12} /> Review Period Ended
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {reviews?.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-400">No reviews yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
}