// components/ErrorFallback.tsx
"use client";

import { useRouter } from "next/navigation";

export default function ErrorFallback({
  title = "Something went wrong",
  message = "Please try again later.",
}: {
  title?: string;
  message?: string;
}) {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 text-center max-w-md w-full border border-gray-200 dark:border-gray-800">

        <div className="text-5xl mb-4">🚫</div>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          {title}
        </h2>

        <p className="text-gray-500 text-sm mb-6">
          {message}
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => router.refresh()}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Refresh
          </button>

          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white hover:bg-gray-300 transition"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}