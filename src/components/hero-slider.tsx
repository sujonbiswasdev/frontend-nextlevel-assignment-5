"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Link, Sparkles } from "lucide-react";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "SUPER DELICIOUS BURGERS",
    subtitle: "Experience the taste of premium handcrafted burgers.",
    image: "https://images.pexels.com/photos/1352274/pexels-photo-1352274.jpeg",
  },
  {
    id: 2,
    title: "FRESH HOT PIZZA",
    subtitle: "Loaded with cheese & baked to perfection.",
    image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg",
  },
  {
    id: 3,
    title: "CRISPY FRIED BURGER",
    subtitle: "Golden crispy bites with signature spices.",
    image: "https://images.pexels.com/photos/1639569/pexels-photo-1639569.jpeg",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const router = useRouter();
  

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

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
            { "Discover Amazing Events"}
          </h1>

          <p className="text-lg text-primary-foreground/70 mb-2 font-medium animate-slide-in" style={{ animationDelay: "0.1s" }}>
            { "Create, join, and manage events effortlessly"}
            {/* featured ? `${formattedDate} · ${featured.venue} */}
          </p>

          <p className="text-base text-primary-foreground/60 mb-8 max-w-lg leading-relaxed animate-slide-in" style={{ animationDelay: "0.15s" }}>
            {"Your all-in-one event management platform. Browse events, join communities, and create unforgettable experiences."}
          </p>

          <div className="flex flex-wrap items-center gap-4 animate-slide-in" style={{ animationDelay: "0.2s" }}>
            {/* {featured ? (
              <Link to={`/events/${featured.id}`}>
                <Button size="lg" className="gap-2 font-semibold shadow-lg">Join Event <ArrowRight className="w-4 h-4" /></Button>
              </Link>
            ) : (
              <Link to="/signup">
                <Button size="lg" className="gap-2 font-semibold shadow-lg">Get Started <ArrowRight className="w-4 h-4" /></Button>
              </Link>
            )} */}
            {/* <Link href="/events"> */}
              {/* <Button size="lg" variant="outline" >
               
              </Button> */}
            {/* </Link> */}
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