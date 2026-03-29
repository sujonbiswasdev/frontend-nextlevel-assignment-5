import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

const CallToAction = () => {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-indigo-900 via-blue-900 to-cyan-900 overflow-hidden">
      {/* Ambient background shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-0 w-80 h-80 rounded-full bg-cyan-400/20 blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-indigo-400/20 blur-2xl -z-10"></div>
        <svg className="absolute top-1/4 right-10 opacity-10 w-80 h-80 -z-10" fill="none" viewBox="0 0 400 400">
          <circle cx="200" cy="200" r="200" fill="url(#paint0_radial_cta)" />
          <defs>
            <radialGradient id="paint0_radial_cta" cx="0" cy="0" r="1" gradientTransform="translate(200 200) scale(200)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8"/>
              <stop offset="1" stopColor="#818cf8" stopOpacity="0"/>
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="container mx-auto max-w-2xl px-4 md:px-8 relative z-10">
        <div className="bg-gradient-to-tr from-cyan-950/70 via-blue-900/70 to-indigo-950/80 backdrop-blur-xl rounded-2xl shadow-xl border border-cyan-400/10 dark:border-cyan-900/20 px-6 md:px-12 py-10 md:py-16 flex flex-col items-center text-center gap-6 md:gap-8">
          <h2 className="text-2xl md:text-4xl font-bold md:font-extrabold text-cyan-50 leading-snug md:leading-tight mb-2 md:mb-0 tracking-tight shadow-sm">
            Your Next Event Starts Here.
            <br className="hidden md:inline" />
            <span className="block text-transparent bg-clip-text bg-gradient-to-l from-cyan-200 via-sky-300 to-indigo-200 mt-2 md:mt-3">
              Host. Create. Inspire.
            </span>
          </h2>
          <p className="text-cyan-100/90 max-w-lg mx-auto text-base md:text-lg leading-relaxed mb-2 md:mb-0">
            Easily manage, promote, and bring your events to life.<br />
            <span className="block mt-1 text-slate-50/80 text-sm md:text-base">No complex setup, secure payments, beautiful invites, and actionable analytics.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-5 justify-center w-full mt-3 md:mt-5">
            <Link href="/signup"  >
         
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 hover:from-cyan-400 hover:via-teal-500 hover:to-blue-700 text-white text-base md:text-lg font-semibold px-7 py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-150 border-none"
                >
                  <span className="mr-2 md:mr-3">🚀</span> Get Started Free
                </Button>
         
            </Link>
            <Link href="/login"  >
            
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-cyan-300 text-black hover:text-white hover:bg-cyan-700/90 hover:border-cyan-400 transition-colors duration-150 px-7 py-3 rounded-xl shadow"
                >
                  <span className="mr-2 md:mr-3">🔑</span> Dashboard Login
                </Button>
           
            </Link>
          </div>
          <div className="mt-5 md:mt-7 w-full flex items-center justify-center gap-1.5 text-xs md:text-sm text-cyan-100/80 font-semibold tracking-tight">
            <svg className="w-4 h-4 text-green-400 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M16.707 7.293a1 1 0 10-1.414 1.414l1.793 1.793a1 1 0 010 1.414l-7 7a1 1 0 01-1.414-1.414l7-7zm-2.829 2.12l-7 7a1 1 0 01-1.415-1.415l7-7a1 1 0 011.415 1.415z"/>
            </svg>
            No credit card required <span aria-hidden className="mx-1">|</span> Cancel anytime
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;