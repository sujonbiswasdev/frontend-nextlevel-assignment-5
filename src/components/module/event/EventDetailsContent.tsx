"use client"

import React from "react"
import Image from "next/image"

import {
  Calendar,
  MapPin,
  Share2,
  Heart,
  Star,
  ArrowRight,
  ChevronLeft
} from "lucide-react"

import { IBaseEvent, IEventPricing, IEventStatusEnum, IEventTypeEnum } from "@/types/event.types"
import { getEventAction } from "@/utils/event.actions"

const EventDetailsPage = ({ eventData }: { eventData: IBaseEvent }) => {

  const formattedDate = new Date(eventData.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })

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
              <Image
                src={eventData.image}
                alt={eventData.title}
                width={1200}
                height={700}
                className="w-full h-[420px] object-cover"
              />
            </div>

            {/* TITLE */}
            <div className="mb-8">

              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                {eventData.title}
              </h1>

              <p className="text-sm text-slate-600 max-w-xl">
                {eventData.description}
              </p>

            </div>

            {/* RATING */}
            <div className="flex items-center gap-2 mb-8">

              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    className={
                      i < eventData.avgRating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                    fill={i < eventData.avgRating ? "currentColor" : "none"}
                  />
                ))}
              </div>

              <span className="text-xs text-slate-500">
                ({eventData.totalReviews} Reviews)
              </span>

            </div>

            {/* INFO */}
            <div className="grid md:grid-cols-2 gap-6">

              <div className="p-5 bg-white rounded-xl border flex gap-4">

                <Calendar className="text-indigo-600" />

                <div>
                  <p className="text-xs text-slate-400 font-semibold">
                    Date
                  </p>

                  <p className="text-sm font-bold">
                    {formattedDate}
                  </p>

                  <p className="text-xs text-indigo-600">
                    {eventData.time}
                  </p>
                </div>

              </div>

              <div className="p-5 bg-white rounded-xl border flex gap-4">

                <MapPin className="text-indigo-600" />

                <div>
                  <p className="text-xs text-slate-400 font-semibold">
                    Location
                  </p>

                  <p className="text-sm font-bold">
                    {eventData.venue}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-4">

            <div className="sticky top-24">

              <div className="bg-white border rounded-2xl shadow-xl p-7">

                <div className="mb-6">

                  <p className="text-xs text-slate-400 font-semibold uppercase">
                    Price
                  </p>

                  <h3 className="text-3xl font-bold">
                    {eventData.fee === 0 ? "Free" : `$${eventData.fee}`}
                  </h3>

                </div>

                {/* FEATURES */}
                <div className="space-y-3 text-sm text-slate-600 mb-6">

                  {/* <p>Visibility: {eventData.visibility}</p> */}

                  <p>Category: {eventData.categories}</p>

                  <p>Status: {eventData.status}</p>

                </div>

                {/* ACTION BUTTON */}

                <button className="w-full py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 transition">

                  {getEventAction(
                    eventData.priceType as IEventPricing,
                    (eventData.visibility as unknown) as IEventTypeEnum
                  )}

                  <ArrowRight size={16} />

                </button>

              </div>

            </div>

          </div>

        </div>

      </main>

      {/* FOOTER */}

      <footer className="max-w-[1480px] mx-auto px-6 py-8 border-t text-center text-xs text-slate-400">

        Event Created: {new Date(eventData.createdAt).toLocaleDateString()}

      </footer>

    </div>
  )
}

export default EventDetailsPage