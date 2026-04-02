"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { IBaseEvent } from "@/types/event.types";

export default function HeroSlider({ data }: { data: IBaseEvent[] }) {
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  // Use the `data` (featured events) as the slides if provided, or fallback to an empty array
  const slides = data && data.length > 0 ? data : [];

  useEffect(() => {
    if (slides.length < 2) return; // Don't auto-slide if 0 or 1 item
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full h-[90vh] max-h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-20" : "opacity-0 z-10"
          }`}
        >
          {/* Background Image */}
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Content */}
          <div className="relative container mx-auto px-2 py-20">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-primary-foreground/90">Featured Event</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-[1.1] mb-4 animate-slide-in">
                {slide.title ?? "Discover Amazing Events"}
              </h1>

              <p className="text-lg text-primary-foreground/70 mb-2 font-medium animate-slide-in" style={{ animationDelay: "0.1s" }}>
                {slide.description ?? "Create, join, and manage events effortlessly"}
              </p>

              <p className="text-base text-primary-foreground/60 mb-8 max-w-lg leading-relaxed animate-slide-in" style={{ animationDelay: "0.15s" }}>
                {slide.venue && slide.date
                  ? `${new Date(slide.date).toLocaleDateString()} · ${slide.venue}`
                  : "Your all-in-one event management platform. Browse events, join communities, and create unforgettable experiences."}
              </p>

              <div className="flex flex-wrap items-center gap-4 animate-slide-in" style={{ animationDelay: "0.2s" }}>
                <button
                  onClick={() => router.push('/events')}
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full font-semibold text-primary bg-primary-foreground/90 hover:bg-accent/90 transition-colors shadow-xl shadow-accent/10 border border-primary/30 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 active:scale-95 active:shadow-inner animate-fade-in duration-200"
                  style={{
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    boxShadow: "0 4px 24px 0 rgba(99,102,241,.15), 0 1.5px 4px 0 rgba(0,0,0,.05)"
                  }}
                  aria-label="Browse All Events"
                >
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Browse All Events
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-40">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              current === index ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}