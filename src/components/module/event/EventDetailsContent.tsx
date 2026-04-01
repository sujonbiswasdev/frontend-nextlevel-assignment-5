"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Calendar, MapPin, Share2, Heart, Star, ArrowRight, ChevronLeft } from "lucide-react";
import { toast } from "react-toastify";

import { IBaseEvent, IEventPricing, IEventTypeEnum, TResponseEvent } from "@/types/event.types";
import { IBaseUser } from "@/types/user.types";
import { TResponseReviewData } from "@/types/review.types";

import { createParticipant } from "@/actions/participant.actions";
import { getEventAction } from "@/utils/event.actions";
import ReviewForm from "../reviews/CreateReview";
import ReviewItem from "../reviews/ReviewItem";
import { useRouter } from "next/navigation";
import { initiatePayLater, initiatePayment } from "@/actions/payment.actions";

const EventDetailsPage = ({
  eventData,
}: {
  eventData: TResponseEvent<{ organizer: IBaseUser; reviews: TResponseReviewData<{ user: IBaseUser; event: IBaseEvent }>[] }>;
}) => {
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const router=useRouter()

  const handleAddParticipant = async (id: string) => {
    const toastId = toast.loading("Registering attendance...");

    try {
      const res = await createParticipant(id);
      toast.dismiss(toastId);
      if (res.success) {
        router.push(res.data.paymentUrl)
        toast.success((res.message, res.data) || "You have been added as a participant!");
      } else {
        toast.error(res.message || "Failed to add participant.");
      }
    } catch (err) {
      toast.dismiss(toastId);
      toast.error("Failed to add participant.");
      console.error(err);
    }
  };

  // handlePayNow ata diya function daw

  const handlePayNow = async (eventId: string) => {
    const toastId = toast.loading("Processing payment...");
    try {
      const res = await createParticipant(eventId);
      toast.dismiss(toastId);
      if (res.success && res.data?.paymentUrl) {
        router.push(res.data.paymentUrl);
        toast.success(res.message || "Redirecting to payment.");
      } else {
        toast.error(res.message || "Payment could not be initiated.");
      }
    } catch (err) {
      toast.dismiss(toastId);
      toast.error("Payment processing failed.");
      console.error(err);
    }
  };

  const handlePayLater = async (eventId: string) => {
    const toastId = toast.loading("Processing Pay Later request...");

    try {
      const res = await initiatePayLater(eventId);
      toast.dismiss(toastId);
      if (res.success && res.data?.redirectUrl) {
        toast.success(res.message || "Redirecting to your payment page.");
      } else {
        toast.error(res.message || "Pay Later could not be initiated.");
      }
    } catch (err) {
      toast.dismiss(toastId);
      toast.error("Request failed for Pay Later.");
      console.error(err);
    }
  };


  return (
    <div className="min-h-screen bg-slate-50">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b">
        <div className="max-w-[1480px] mx-auto px-6 h-20 flex items-center justify-between">
          <button className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600">
            <ChevronLeft size={18} />
            Back to Events
          </button>
          <div className="flex gap-3">
            <button className="p-2 border rounded-full hover:bg-slate-100">
              <Share2 size={16} />
            </button>
            <button className="p-2 border rounded-full hover:bg-slate-100">
              <Heart size={16} />
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="max-w-[1480px] mx-auto px-6 py-14">
        <div className="grid lg:grid-cols-12 gap-12">

          {/* LEFT */}
          <div className="lg:col-span-8">

            {/* IMAGE */}
            <div className="relative rounded-2xl overflow-hidden mb-10 border">
              {eventData?.image ? (
                <Image
                  src={eventData.image}
                  alt={eventData.title}
                  width={1200}
                  height={700}
                  className="w-full h-[420px] object-cover"
                />
              ) : (
                <div className="w-full h-[420px] flex items-center justify-center bg-gray-200 text-gray-400">
                  No Image Available
                </div>
              )}
            </div>

            {/* TITLE & DESCRIPTION */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{eventData.title}</h1>
              <p className="text-sm text-slate-600 max-w-xl">{eventData.description}</p>
            </div>

            {/* RATING */}
            <div className="flex items-center gap-2 mb-8">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    className={i < eventData.avgRating ? "text-yellow-400" : "text-gray-300"}
                    fill={i < eventData.avgRating ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-500">({eventData.totalReviews} Reviews)</span>
            </div>

            {/* INFO */}
            <div className="grid md:grid-cols-2 gap-6">

              <div className="p-5 bg-white rounded-xl border flex gap-4">
                <Calendar className="text-indigo-600" />
                <div>
                  <p className="text-xs text-slate-400 font-semibold">Date</p>
              
                  <p className="text-xs text-indigo-600">{eventData.time}</p>
                </div>
              </div>

              <div className="p-5 bg-white rounded-xl border flex gap-4">
                <MapPin className="text-indigo-600" />
                <div>
                  <p className="text-xs text-slate-400 font-semibold">Location</p>
                  <p className="text-sm font-bold">{eventData.venue}</p>
                </div>
              </div>
            </div>

            {/* REVIEWS */}
            <div className="mt-10 space-y-6">
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>

              {eventData.reviews?.length > 0 ? (
                eventData.reviews.map((review) => (
                  <ReviewItem
                    key={review.id}
                    user={eventData.organizer}
                    review={review}
                    event={eventData}
                    activeReplyId={activeReplyId}
                    setActiveReplyId={setActiveReplyId}
                  />
                ))
              ) : (
                <p className="text-sm text-gray-500">No reviews yet. Be the first to review!</p>
              )}

              {/* Add new review */}
              <ReviewForm eventId={eventData.id} />
            </div>

          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <div className="bg-white border rounded-2xl shadow-xl p-7">
                <div className="mb-6">
                  <p className="text-xs text-slate-400 font-semibold uppercase">Price</p>
                  <h3 className="text-3xl font-bold">
                    {eventData.fee === 0 ? "Free" : `$${eventData.fee}`}
                  </h3>
                </div>

                <div className="space-y-3 text-sm text-slate-600 mb-6">
                  <p>Category: {eventData.categories}</p>
                  <p>Status: {eventData.status}</p>
                </div>

                {eventData.fee === 0 ? (
                  <button
                    onClick={() => handleAddParticipant(eventData.id)}
                    className="w-full py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 transition"
                  >
                    Join Now
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handlePayNow(eventData.id)}
                      className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 transition"
                    >
                      Pay & Join
                    </button>
                    <button
                      onClick={() => handlePayLater(eventData.id)}
                      className="flex-1 py-3 bg-slate-200 text-slate-800 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-slate-300 transition"
                    >
                      Pay Later & request
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="max-w-[1480px] mx-auto px-6 py-8 border-t text-center text-xs text-slate-400">
        Event Created: {new Date(eventData.createdAt).toLocaleDateString()}
      </footer>

    </div>
  );
};

export default EventDetailsPage;