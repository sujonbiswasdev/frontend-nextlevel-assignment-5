"use client";

import {useState } from "react";
import Image from "next/image";
import { Calendar, MapPin, Share2, Heart, Star, ChevronLeft } from "lucide-react";
import { toast } from "react-toastify";

import {TResponseEvent } from "@/types/event.types";
import { IBaseUser } from "@/types/user.types";
import { IgetReviewData } from "@/types/review.types";

import { createParticipant } from "@/actions/participant.actions";
import ReviewForm from "../reviews/CreateReview";
import ReviewItem from "../reviews/ReviewItem";
import { useRouter } from "next/navigation";
import { initiatePayLater } from "@/actions/payment.actions";
import { Button } from "@/components/ui/button";

const EventDetailsPage = ({eventData}: {eventData:TResponseEvent<{reviews:IgetReviewData[],organizer:IBaseUser}> }) => {
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const router=useRouter()

  const handleAddParticipant = async (id: string) => {
    const toastId = toast.loading("Registering attendance...");
    try {
      const res = await createParticipant(id);
      toast.dismiss(toastId);
      if (res.success) {
        toast.success("You have been added as a participant!");
        if(eventData.visibility==="PUBLIC" && eventData.priceType==="FREE"){
          router.push(res.data.paymentUrl)
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
    <div className="min-h-screen mt-11 bg-slate-50">
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
                  priority
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
                eventData.reviews.map((review:any) => (
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
                <div className="mb-6 flex justify-between flex-wrap items-center">
                 <div>
                 <p className="text-xs text-slate-400 font-semibold uppercase">Price</p>
                  <h3 className="text-3xl font-bold">
                    {eventData.fee === 0 ? "Free" : `$${eventData.fee}`}
                  </h3>
                 </div>
                 <div>
                 <p className="text-xs text-slate-400 font-semibold uppercase">visibility</p>
                  <h3 className="text-xl font-bold">
                  {eventData.visibility}
                  </h3>
                 </div>
                </div>

              <div className="">
              <div className="space-y-3 text-sm text-slate-600 mb-6">
                  <p>Category: {eventData.categories}</p>
                  <p>Status: {eventData.status}</p>
                  <div className="space-y-3 text-sm text-slate-600 mb-6">
                  <p>priceType: {eventData.priceType}</p>
                </div>
                </div>
              </div>
              <div className="flex justify-between flex-wrap">
              <div className="">
                {eventData.visibility==="PUBLIC" && eventData.priceType==="FREE"?<Button onClick={()=>handleAddParticipant(eventData.id)}>join</Button>:eventData.visibility=="PUBLIC" && eventData.priceType=="PAID"?<Button onClick={()=>handleAddParticipant(eventData.id)}>pay & join</Button>:eventData.visibility=="PRIVATE" && eventData.priceType=="FREE"?<Button onClick={()=>handleAddParticipant(eventData.id)}>request & join</Button>:<Button onClick={()=>handleAddParticipant(eventData.id)}>pay & request</Button>}
               </div>
               <div>
                <Button onClick={()=>handlePayLater(eventData.id)}>pay Later & request</Button>
               </div>
              </div>
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