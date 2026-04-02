import React from "react";

const LoadingContentPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-950 dark:via-slate-900 dark:to-gray-950">
      <div className="relative mb-10">
        {/* Glassmorphic loader container */}
        <div className="absolute inset-0 rounded-2xl bg-white/30 dark:bg-slate-700/30 backdrop-blur-md shadow-xl z-0" />
        {/* Spinning SVG Loader */}
        <svg
          className="relative z-10 w-28 h-28 animate-spin"
          viewBox="0 0 112 112"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="loader-gradient" x1="0" y1="0" x2="112" y2="112" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2563eb" />
              <stop offset="1" stopColor="#7c3aed" />
            </linearGradient>
            <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#7c3aed66" />
            </filter>
          </defs>
          <circle
            cx="56"
            cy="56"
            r="45"
            stroke="#e0e7ef"
            strokeWidth="6"
            opacity="0.34"
          />
          <circle
            cx="56"
            cy="56"
            r="45"
            stroke="url(#loader-gradient)"
            strokeWidth="6"
            strokeDasharray="60 180"
            strokeLinecap="round"
            filter="url(#shadow)"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-semibold tracking-tight text-blue-800 dark:text-blue-300 mb-2 animate-fade-in">
        Welcome to Your Dashboard
      </h2>
      <p className="text-lg text-slate-700 dark:text-slate-200 mb-1 animate-fade-in-slow">
        Hang tight while we’re loading your data.
      </p>
      <p className="text-sm text-slate-400 dark:text-slate-400 animate-fade-in-delay">
        This should only take a moment.
      </p>
      <style>
        {`
          /* Always spinning the loader */
          .animate-spin {
            animation: spin-loader 1s linear infinite;
          }
          @keyframes spin-loader {
            100% {
              transform: rotate(360deg);
            }
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(12px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in { animation: fade-in .8s .3s both;}
          .animate-fade-in-slow { animation: fade-in 1s .65s both;}
          .animate-fade-in-delay { animation: fade-in 1.1s 1.1s both;}
        `}
      </style>
    </div>
  );
};

export default LoadingContentPage;