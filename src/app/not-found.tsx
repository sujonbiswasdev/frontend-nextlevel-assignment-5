'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-blue-100 via-fuchsia-100 to-emerald-100 dark:from-blue-900 dark:via-fuchsia-900 dark:to-emerald-950 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-xl md:max-w-2xl bg-white/90 dark:bg-gray-950/90 rounded-2xl shadow-xl flex flex-col items-center p-8 md:p-14 border-t-8 border-blue-400 dark:border-blue-700 relative"
      >
        {/* Professional, minimal illustration */}
        <motion.div
          initial={{ y: -18, opacity: 0, scale: 0.92 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 230, damping: 18, delay: 0.08 }}
        >
          {/* "Not Found" SVG Illustration */}
          <svg
            width={90}
            height={90}
            viewBox="0 0 90 90"
            fill="none"
            aria-hidden
            className="mb-5 drop-shadow-md"
          >
            <defs>
              <linearGradient id="notfound-gradient" x1="0" y1="0" x2="90" y2="90" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2563EB"/>
                <stop offset="0.55" stopColor="#E0E7EF"/>
                <stop offset="1" stopColor="#10B981"/>
              </linearGradient>
              <radialGradient id="notfound-bg" cx="0.5" cy="0.4" r="0.67" fx="0.5" fy="0.5">
                <stop offset="0%" stopColor="#FFF" />
                <stop offset="100%" stopColor="#E0E7EF" />
              </radialGradient>
            </defs>
            {/* Outer Circle */}
            <circle cx="45" cy="45" r="41" fill="url(#notfound-gradient)" stroke="#E0E7EF" strokeWidth="6"/>
            {/* Magnifying Glass */}
            <g>
              <ellipse cx="45" cy="48" rx="19" ry="11" fill="#EAEAF2" opacity="0.90"/>
              <rect x="32" y="38" width="26" height="3.5" rx="1.7" fill="#CED1D8" opacity="0.94"/>
              <circle cx="37.5" cy="54" r="2.2" fill="#CED1D8"/>
              <circle cx="52.5" cy="54" r="2.2" fill="#CED1D8"/>
            </g>
            {/* 404 text */}
            <g>
              <text
                x="50%"
                y="33"
                textAnchor="middle"
                fontSize="28"
                fontWeight="bold"
                fill="#3B82F6"
                style={{ letterSpacing: 3 }}
                dominantBaseline="middle"
              >
                404
              </text>
              {/* Sad face mouth */}
              <path
                d="M41 65 Q45 70 49 65"
                stroke="#94A3B8"
                strokeWidth="2"
                fill="none"
                opacity="0.62"
                strokeLinecap="round"
              />
            </g>
            {/* Cross marks for "eyes" */}
            <g>
              <line x1="39" y1="46" x2="41" y2="48" stroke="#A5B4FC" strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="41" y1="46" x2="39" y2="48" stroke="#A5B4FC" strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="49" y1="46" x2="51" y2="48" stroke="#A5B4FC" strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="51" y1="46" x2="49" y2="48" stroke="#A5B4FC" strokeWidth="1.4" strokeLinecap="round"/>
            </g>
          </svg>
        </motion.div>
        <motion.h1
          className="text-center font-black text-4xl md:text-6xl bg-gradient-to-r from-blue-700 via-fuchsia-800 to-emerald-700 bg-clip-text text-transparent tracking-tight mb-3"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.17, duration: 0.5, type: 'spring' }}
        >
          404
        </motion.h1>
        <motion.h2
          className="text-center text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-100 mb-3"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.20, duration: 0.48, type: 'spring' }}
        >
          Page Not Found
        </motion.h2>
        <motion.p
          className="text-center text-base md:text-lg text-gray-500 dark:text-gray-300 max-w-md mb-8"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.4 }}
        >
          Sorry, the page you are looking for does not exist or has been moved. <br />
          Please check the URL or return to the dashboard.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-2 w-full justify-center"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.3 }}
        >
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
          >
            ← Go Back
          </button>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center justify-center px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-shadow focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-md"
          >
            Go to Home
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;