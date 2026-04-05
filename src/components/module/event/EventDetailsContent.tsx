"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Calendar, MapPin, Star } from "lucide-react";
import { toast } from "react-toastify";

import { TResponseEvent } from "@/types/event.types";
import { IBaseUser } from "@/types/user.types";
import { IgetReviewData } from "@/types/review.types";

import { createParticipant } from "@/actions/participant.actions";
import ReviewForm from "../reviews/CreateReview";
import ReviewItem from "../reviews/ReviewItem";
import { useRouter } from "next/navigation";
import { initiatePayLater } from "@/actions/payment.actions";
import { Button } from "@/components/ui/button";

// Design constants
const gradientBg =
  "bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400";
const sidebarCard =
  "shadow-2xl border-0 bg-gradient-to-br from-white/80 via-purple-50 to-pink-50";
const infoCard =
  "rounded-xl border-0 shadow-lg bg-gradient-to-br from-indigo-50 via-white to-pink-50";
const statLabel =
  "bg-gradient-to-r from-indigo-400 to-blue-400 text-white px-2 py-1 rounded text-[11px] font-bold uppercase tracking-widest";

const EventDetailsPage = ({
  eventData,
}: {
  eventData: TResponseEvent<{
    reviews: IgetReviewData[];
    organizer: IBaseUser;
  }>;
}) => {
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const router = useRouter();

  // Unified Participation Logic
  const handleAddParticipant = async (eventId: string) => {
    const toastId = toast.loading("Registering attendance...");
    try {
      const res = await createParticipant(eventId);
      toast.dismiss(toastId);
      if (res.success) {
        toast.success("You have been added as a participant!");
        // Only redirect if there is a payment URL present
        if (res.data && res.data.paymentUrl) {
          router.push(res.data.paymentUrl);
        }
      } else {
        toast.error(res.message || "Failed to add participant.");
      }
    } catch (err) {
      toast.dismiss(toastId);
      toast.error("Failed to add participant.");
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
        window.location.href = res.data.redirectUrl;
      } else {
        toast.error(res.message || "Pay Later could not be initiated.");
      }
    } catch (err) {
      toast.dismiss(toastId);
      toast.error("Request failed for Pay Later.");
      console.error(err);
    }
  };

  // Button rendering logic for event participation
  const renderJoinButton = () => {
    if (eventData.visibility === "PUBLIC" && eventData.priceType === "FREE") {
      return (
        <Button
          className="bg-gradient-to-r from-green-400 to-blue-400 text-white shadow-lg hover:from-indigo-500 hover:to-purple-500"
          onClick={() => handleAddParticipant(eventData.id)}
        >
          Join
        </Button>
      );
    } else if (
      eventData.visibility === "PUBLIC" &&
      eventData.priceType === "PAID"
    ) {
      return (
        <Button
          className="bg-gradient-to-r from-yellow-400 to-pink-500 text-white shadow-lg hover:from-orange-400 hover:to-pink-600"
          onClick={() => handleAddParticipant(eventData.id)}
        >
          Pay &amp; Join
        </Button>
      );
    } else if (
      eventData.visibility === "PRIVATE" &&
      eventData.priceType === "FREE"
    ) {
      return (
        <Button
          className="bg-gradient-to-r from-indigo-300 to-blue-400 text-white shadow-lg hover:from-blue-600 hover:to-indigo-700"
          onClick={() => handleAddParticipant(eventData.id)}
        >
          Request to Join
        </Button>
      );
    } else {
      // PRIVATE & PAID
      return (
        <Button
          className="bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-lg hover:from-pink-500 hover:to-purple-700"
          onClick={() => handleAddParticipant(eventData.id)}
        >
          Pay &amp; Request
        </Button>
      );
    }
  };

  return (
    <div className={`min-h-screen mt-11 ${gradientBg} bg-fixed`}>
      {/* Decorative header */}
      <div className="absolute left-0 top-0 z-0 opacity-30 pointer-events-none w-full h-[320px] max-h-[30vh] bg-gradient-to-tl from-pink-300 via-purple-200 to-indigo-200 blur-3xl rounded-b-full"></div>
      <main className="relative z-10 max-w-[1480px] mx-auto px-6 py-14">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* LEFT */}
          <div className="lg:col-span-8">
            {/* IMAGE */}
            <div className="relative rounded-2xl overflow-hidden mb-10 border-2 border-purple-200 shadow-2xl">
              {eventData?.image ? (
                <Image
                  src={eventData.image}
                  alt={eventData.title}
                  width={1200}
                  priority
                  height={700}
                  className="w-full h-[420px] object-cover scale-105 hover:scale-110 transition-all duration-500"
                />
              ) : (
                <div className="w-full h-[420px] flex items-center justify-center bg-gradient-to-tr from-gray-200 to-pink-100 text-gray-400 font-bold text-xl">
                  No Image Available
                </div>
              )}
              <div className="absolute top-3 left-4">
                <span className="px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-300 text-white text-xs font-bold shadow">
                  {eventData.status}
                </span>
              </div>
            </div>
            {/* TITLE & DESCRIPTION */}
            <div className="mb-8 bg-white/70 rounded-xl px-6 py-6 shadow-lg border-2 border-blue-100">
              <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-pink-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
                {eventData.title}
              </h1>
              <p className="text-sm text-slate-700 max-w-xl">
                {eventData.description}
              </p>
            </div>
            {/* RATING */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < eventData.avgRating
                        ? "text-yellow-400 drop-shadow-md"
                        : "text-gray-300"
                    }
                    fill={i < eventData.avgRating ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="text-xs px-2 py-1 rounded bg-blue-100 text-indigo-600 shadow">
                ({eventData.totalReviews} Reviews)
              </span>
            </div>
            {/* INFO */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className={`${infoCard} p-5 flex gap-4 items-center`}>
                <span className="rounded-full bg-gradient-to-br from-indigo-400 to-blue-200 p-2 shadow text-white">
                  <Calendar size={30} />
                </span>
                <div>
                  <p className={statLabel}>Date</p>
                  <p className="text-md font-medium text-indigo-700 mt-1">
                    {eventData.time}
                  </p>
                </div>
              </div>
              <div className={`${infoCard} p-5 flex gap-4 items-center`}>
                <span className="rounded-full bg-gradient-to-br from-pink-400 to-yellow-200 p-2 shadow text-white">
                  <MapPin size={30} />
                </span>
                <div>
                  <p className={statLabel}>Location</p>
                  <p className="text-md font-medium text-pink-600 mt-1">
                    {eventData.venue}
                  </p>
                </div>
              </div>
            </div>
            {/* REVIEWS */}
            <div className="mt-10 space-y-6">
              <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-indigo-400 via-pink-400 to-pink-700 bg-clip-text text-transparent">
                Reviews
              </h2>
              {eventData.reviews?.length > 0 ? (
                eventData.reviews.map((review: IgetReviewData) => (
                  <div
                    key={review.id}
                    className="rounded-xl border-2 border-indigo-50 bg-white/95 shadow-md px-4 py-4"
                  >
                    <ReviewItem
                      user={eventData.organizer}
                      review={{
                        ...review,
                        user: eventData.organizer,
                        event: eventData,
                      }}
                      event={eventData}
                      activeReplyId={activeReplyId}
                      setActiveReplyId={setActiveReplyId}
                    />
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 bg-indigo-50 px-4 py-2 rounded">
                  No reviews yet. Be the first to review!
                </p>
              )}
              {/* Add new review */}
              <div className="rounded-xl border-2 border-indigo-50 bg-gradient-to-br from-pink-50 to-indigo-50 shadow px-4 py-2">
                <ReviewForm eventId={eventData.id} />
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <div className={`${sidebarCard} rounded-3xl p-7 border-2 border-purple-100`}>
                <div className="mb-7 flex justify-between flex-wrap items-center gap-4">
                  <div>
                    <p className={statLabel}>Price</p>
                    <h3 className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-green-400 via-indigo-600 to-pink-600 bg-clip-text">
                      {eventData.fee === 0 ? "Free" : `$${eventData.fee}`}
                    </h3>
                  </div>
                  <div>
                    <p className={statLabel}>Visibility</p>
                    <span
                      className={`text-lg font-bold px-3 py-1 rounded-full shadow ${
                        eventData.visibility === "PUBLIC"
                          ? "bg-green-100 text-green-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {eventData.visibility}
                    </span>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-slate-700 mb-4">
                  <span className="inline-block mr-2 bg-yellow-100 text-yellow-800 rounded-full px-3 py-1 font-semibold text-xs shadow">
                    Category
                  </span>{" "}
                  {eventData.categories}
                  <br />
                  <span className="inline-block mr-2 bg-blue-100 text-blue-800 rounded-full px-3 py-1 font-semibold text-xs shadow">
                    Status
                  </span>{" "}
                  {eventData.status}
                  <br />
                  <span className="inline-block mr-2 bg-pink-200 text-pink-800 rounded-full px-3 py-1 font-semibold text-xs shadow">
                    Price Type
                  </span>{" "}
                  {eventData.priceType}
                </div>
                <div className="flex justify-between flex-wrap gap-2 mt-6">
                  <div>{renderJoinButton()}</div>
                  <div>
                    {eventData.priceType === "PAID" && (
                      <Button
                        className="bg-gradient-to-r from-yellow-400 to-indigo-400 text-white shadow-lg hover:from-pink-400 hover:to-purple-500"
                        onClick={() => handlePayLater(eventData.id)}
                      >
                        Pay Later &amp; {eventData.visibility === "PRIVATE" ? "Request" : "Join"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="max-w-[1480px] mx-auto px-6 py-8 border-t mt-8 text-center text-xs text-slate-400 bg-gradient-to-r from-indigo-50 via-pink-50 to-yellow-50">
        Event Created:{" "}
        <span className="bg-gradient-to-r from-pink-400 via-blue-400 to-yellow-400 bg-clip-text text-transparent font-bold">
          {new Date(eventData.createdAt).toLocaleDateString()}
        </span>
      </footer>
    </div>
  );
};

export default EventDetailsPage;