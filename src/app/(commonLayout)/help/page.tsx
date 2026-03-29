"use client";
import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";



const categories = [
  { title: "Getting Started", desc: "Learn how to use the platform", icon: "🚀" },
  { title: "Event Management", desc: "Create & manage events", icon: "📅" },
  { title: "Payments", desc: "Fees, refunds & payments", icon: "💳" },
  { title: "Account", desc: "Profile & security settings", icon: "👤" },
  { title: "Invitations", desc: "Manage invites & approvals", icon: "📩" },
  { title: "Reviews", desc: "Ratings & feedback system", icon: "⭐" },
];

const faqs = [
  {
    q: "How do I create an event?",
    a: "Go to dashboard → create event → fill all required fields and publish.",
  },
  {
    q: "How does payment work?",
    a: "For paid events, users must complete payment before joining.",
  },
  {
    q: "Can I cancel my event?",
    a: "Yes, event owners can edit or delete events anytime.",
  },
  {
    q: "How do private events work?",
    a: "Users must request access and wait for approval.",
  },
];

const HelpCenter = () => {
    const router=useRouter()
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  return (
    <div className="bg-neutral-100 min-h-screen">

      {/* HERO SEARCH with accessible color contrast */}
      <div className="bg-gradient-to-r from-sky-700 to-indigo-800 py-20 px-4 text-center text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow">
          Help Center
        </h1>
        <p className="text-blue-200 mb-6">
          Find answers, guides, and support for your events
        </p>

        {/* Search Box */}
        <div className="max-w-2xl mx-auto relative">
          <input
            type="text"
            placeholder="Search for help..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-3 rounded-full text-neutral-900 bg-white border border-neutral-300 focus:ring-2 focus:ring-sky-600 focus:outline-none shadow-lg placeholder-neutral-400"
          />
          <Search className="absolute right-4 top-3.5 text-neutral-400" />
        </div>
      </div>

      {/* CATEGORY CARDS with improved color and hover style */}
      <div className="max-w-[1480px] mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold mb-8 text-neutral-900">
          Popular Topics
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow border border-neutral-200 hover:shadow-lg hover:border-blue-600 hover:-translate-y-1 transition cursor-pointer"
            >
              <div className="text-3xl mb-3">{cat.icon}</div>
              <h3 className="font-semibold text-lg text-neutral-900">
                {cat.title}
              </h3>
              <p className="text-sm text-neutral-600 mt-1">
                {cat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ SECTION with improved visibility */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-6 text-neutral-900">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs
            .filter((item) =>
              item.q.toLowerCase().includes(search.toLowerCase())
            )
            .map((faq, i) => (
              <div
                key={i}
                className="bg-white border border-neutral-200 rounded-xl p-5 shadow"
              >
                <button
                  className="w-full flex justify-between items-center text-left"
                  onClick={() =>
                    setOpenIndex(openIndex === i ? null : i)
                  }
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span className="font-medium text-neutral-900">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`transition ${
                      openIndex === i ? "rotate-180 text-blue-700" : "text-neutral-400"
                    }`}
                  />
                </button>

                {openIndex === i && (
                  <p
                    className="mt-3 text-sm text-neutral-700"
                    id={`faq-panel-${i}`}
                  >
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* CONTACT SUPPORT with better accessible colors */}
      <div className="bg-white border-t border-neutral-200 py-14 text-center">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          Still need help?
        </h2>
        <p className="text-neutral-600 mb-6">
          Our support team is here for you
        </p>

        <button onClick={()=>router.push("/contact")} className="px-6 py-3 bg-blue-700 text-white rounded-full font-semibold hover:bg-blue-800 focus:ring-2 focus:ring-blue-400 transition">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default HelpCenter;