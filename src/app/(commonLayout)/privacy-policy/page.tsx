"use client";
import React from "react";

const sections = [
  { id: "intro", title: "Introduction" },
  { id: "data", title: "Information We Collect" },
  { id: "usage", title: "How We Use Information" },
  { id: "sharing", title: "Data Sharing" },
  { id: "cookies", title: "Cookies & Tracking" },
  { id: "security", title: "Data Security" },
  { id: "rights", title: "User Rights" },
  { id: "retention", title: "Data Retention" },
  { id: "changes", title: "Changes to Policy" },
  { id: "contact", title: "Contact Us" },
];

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm md:text-base text-blue-100">
            Your privacy matters to us. This policy explains how we collect,
            use, and protect your data.
          </p>
          <p className="mt-2 text-xs text-blue-200">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-4 gap-10">
        
        {/* Sidebar */}
        <aside className="hidden lg:block sticky top-24 h-fit">
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">
              Contents
            </h3>
            <ul className="space-y-2 text-sm">
              {sections.map((sec) => (
                <li key={sec.id}>
                  <a
                    href={`#${sec.id}`}
                    className="block text-gray-600 hover:text-blue-600 transition"
                  >
                    {sec.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3 bg-white border rounded-xl shadow-sm p-6 md:p-10">
          
          <div className="space-y-10 text-gray-700 leading-relaxed text-sm md:text-base">

            <section id="intro">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Introduction
              </h2>
              <p>
                We value your privacy and are committed to protecting your
                personal information. This Privacy Policy explains how we handle
                your data when you use our platform.
              </p>
            </section>

            <section id="data">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Information We Collect
              </h2>
              <p>
                We may collect personal information such as your name, email,
                payment details, and usage data when you interact with our
                services.
              </p>
            </section>

            <section id="usage">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                How We Use Information
              </h2>
              <p>
                Your data is used to provide and improve our services, process
                transactions, personalize your experience, and communicate
                important updates.
              </p>
            </section>

            <section id="sharing">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Data Sharing
              </h2>
              <p>
                We do not sell your personal data. Information may be shared with
                trusted third parties such as payment providers and analytics
                services.
              </p>
            </section>

            <section id="cookies">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Cookies & Tracking
              </h2>
              <p>
                We use cookies and similar technologies to enhance user
                experience, track usage, and improve platform performance.
              </p>
            </section>

            <section id="security">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Data Security
              </h2>
              <p>
                We implement appropriate security measures to protect your data
                from unauthorized access, disclosure, or loss.
              </p>
            </section>

            <section id="rights">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                User Rights
              </h2>
              <p>
                You have the right to access, update, or delete your personal
                data. You may also opt out of certain communications.
              </p>
            </section>

            <section id="retention">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Data Retention
              </h2>
              <p>
                We retain your data only as long as necessary to provide our
                services and comply with legal obligations.
              </p>
            </section>

            <section id="changes">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Changes to Policy
              </h2>
              <p>
                We may update this policy from time to time. Continued use of the
                platform indicates acceptance of the updated policy.
              </p>
            </section>

            <section id="contact">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Contact Us
              </h2>
              <p>
                If you have any questions, contact us at:
                <span className="block mt-1 font-medium text-blue-600">
                  support@eventhub.com
                </span>
              </p>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
};

export default PrivacyPolicy;