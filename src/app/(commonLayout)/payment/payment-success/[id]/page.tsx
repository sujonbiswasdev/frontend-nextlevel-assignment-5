import React from "react";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { getOwnParticipantPayment } from "@/actions/participant.actions";

// Simple ErrorBoundary component for async server components
function ErrorBoundary({ error }: { error: Error }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-100">
      <section className="w-full max-w-xl relative">
        <div className="relative z-10 bg-white rounded-2xl shadow-lg border border-gray-100 px-8 py-12 md:px-12 flex flex-col items-center">
          <span className="rounded-full bg-red-50 p-3 mb-1 shadow-sm">
            {/* Use a cross or warning icon if desired */}
            <svg className="text-red-500" height={44} width={44} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-1">
            Something went wrong
          </h1>
          <p className="text-sm text-gray-500 text-center max-w-sm">
            Sorry, an unexpected error occurred while loading your payment details.
          </p>
          <div className="text-xs text-gray-400 pt-8 text-center w-full">
            {error.message}
          </div>
          <div className="flex gap-2 mt-6">
            <Link
              href="/events"
              className="inline-flex justify-center items-center rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 shadow transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Browse Events
            </Link>
            <Link
              href="/"
              className="inline-flex justify-center items-center rounded-md border border-gray-200 bg-white hover:bg-neutral-50 text-indigo-700 font-semibold py-2 px-4 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-100"
            >
              Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

const InfoRow = ({
  label,
  value,
  highlight,
  mono = false,
}: {
  label: string;
  value: React.ReactNode;
  highlight?: boolean;
  mono?: boolean;
}) => (
  <div className="flex flex-row gap-2 py-1">
    <span className="text-gray-700 font-semibold min-w-[122px]">{label}:</span>
    <span
      className={`${
        highlight
          ? "text-green-600 font-bold"
          : mono
          ? "font-mono text-gray-500"
          : "text-gray-800"
      }`}
    >
      {value}
    </span>
  </div>
);

// Async page-level error boundary logic
const PaymentSuccessPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  try {
    const { id } = await params;
    const participant = await getOwnParticipantPayment(id);

    // Professional, clean layout with clear information hierarchy
    return (
      <main className="min-h-screen flex items-center justify-center bg-neutral-100">
        <section className="w-full max-w-xl relative">
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
            <svg width="400" height="400" className="opacity-10 scale-125">
              <defs>
                <radialGradient id="g1" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#f0fdfa" />
                </radialGradient>
              </defs>
              <circle cx="200" cy="200" r="200" fill="url(#g1)" />
            </svg>
          </div>
          <div className="relative z-10 bg-white rounded-2xl shadow-lg border border-gray-100 px-8 py-12 md:px-12 flex flex-col items-center">
            <div className="flex flex-col items-center gap-1 mb-5">
              <span className="rounded-full bg-green-50 p-3 mb-1 shadow-sm">
                <CheckCircle2 className="text-green-500" size={44} />
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                Payment Successful
              </h1>
              <p className="text-sm text-gray-500 text-center max-w-sm">
                Thank you for your payment. Your registration has been confirmed. All details are below.
              </p>
            </div>
            <div className="w-full">
              <div className="border-t border-gray-100 my-6" />
              <h2 className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">
                Registration Summary
              </h2>
              {participant.data && participant.data.length > 0 ? (
                participant.data.map((item: any, i: number) => (
                  <div
                    key={item?.payment?.transactionId || i}
                    className="bg-neutral-50 rounded-xl p-5 border border-gray-100 shadow-inner mb-4"
                  >
                    <InfoRow
                      label="Event"
                      value={item?.event?.title || "-"}
                    />
                    <InfoRow
                      label="Date"
                      value={
                        item?.event?.date
                          ? new Date(item.event.date).toLocaleString(undefined, {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "-"
                      }
                    />
                    <InfoRow
                      label="Venue"
                      value={item?.event?.venue || "-"}
                    />
                    <InfoRow
                      label="Amount Paid"
                      value={
                        item?.payment?.amount
                          ? `৳${item.payment.amount}`
                          : "-"
                      }
                      highlight
                    />
                    <InfoRow
                      label="Status"
                      value={
                        <span
                          className={`inline-block px-2 py-[1px] rounded-md text-xs font-semibold ${
                            item?.paymentStatus === "paid" || item?.payment?.status === "paid"
                              ? "bg-green-100 text-green-700"
                              : item?.paymentStatus === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {item?.paymentStatus || item?.payment?.status || "Unknown"}
                        </span>
                      }
                    />
                    <InfoRow
                      label="Transaction ID"
                      value={item?.payment?.transactionId || "-"}
                      mono
                    />
                    <InfoRow
                      label="Joined At"
                      value={
                        item?.joinedAt
                          ? new Date(item.joinedAt).toLocaleString()
                          : "-"
                      }
                    />
                  </div>
                ))
              ) : (
                <div className="text-center text-red-500 my-8">No payment details found.</div>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-3 w-full mt-8">
              <Link
                href="/events"
                className="flex-1 inline-flex justify-center items-center rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 shadow transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                Browse More Events
              </Link>
              <Link
                href="/"
                className="flex-1 inline-flex justify-center items-center rounded-md border border-gray-200 bg-white hover:bg-neutral-50 text-indigo-700 font-semibold py-3 px-6 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-100"
              >
                Home
              </Link>
            </div>
            <div className="text-xs text-gray-400 pt-8 text-center w-full">
              Need help?&nbsp;
              <a
                href="https://wa.me/01804935939"
                className="underline text-indigo-600 hover:text-indigo-800 transition"
              >
                Contact Support
              </a>
            </div>
          </div>
        </section>
      </main>
    );
  } catch (error: any) {
    return <ErrorBoundary error={error} />;
  }
};

export default PaymentSuccessPage;