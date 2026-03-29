"use client";

import { useState } from "react";

export default function ImageSkeleton({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {loading && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800" />
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoading(false)}
        className={`w-full h-full object-cover transition duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}