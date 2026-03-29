"use client";
import React from "react";

const sections = [
  { id: "acceptance", title: "Acceptance of Terms" },
  { id: "use", title: "Use of the Platform" },
  { id: "accounts", title: "User Accounts" },
  { id: "events", title: "Event Management" },
  { id: "payments", title: "Payments & Fees" },
  { id: "privacy", title: "Privacy Policy" },
  { id: "liability", title: "Limitation of Liability" },
  { id: "changes", title: "Changes to Terms" },
  { id: "contact", title: "Contact Us" },
];

const TermsPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-10">
        
        {/* Sidebar */}
        <aside className="hidden lg:block sticky top-20 h-fit">
          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-4">
              Table of Contents
            </h3>
            <ul className="space-y-2 text-sm">
              {sections.map((sec) => (
                <li key={sec.id}>
                  <a
                    href={`#${sec.id}`}
                    className="text-gray-600 hover:text-blue-600 transition"
                  >
                    {sec.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Content */}
        <main className="lg:col-span-3 bg-white p-6 md:p-10 rounded-xl shadow-sm border">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Terms & Conditions
            </h1>
            <p className="text-gray-500 text-sm">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-10 text-gray-700 leading-relaxed text-sm md:text-base">

            <section id="acceptance">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Acceptance of Terms
              </h2>
              <p>
                By accessing and using our platform, you agree to comply with
                these Terms and Conditions. If you do not agree, please do not
                use our services.
              </p>
            </section>

            <section id="use">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Use of the Platform
              </h2>
              <p>
                You agree to use the platform only for lawful purposes. You must
                not misuse the platform or attempt to access unauthorized areas.
              </p>
            </section>

            <section id="accounts">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                User Accounts
              </h2>
              <p>
                You are responsible for maintaining the confidentiality of your
                account. Any activity under your account is your responsibility.
              </p>
            </section>

            <section id="events">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Event Management
              </h2>
              <p>
                Event organizers are responsible for the accuracy of event
                details. We are not liable for cancellations, changes, or issues
                related to events.
              </p>
            </section>

            <section id="payments">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Payments & Fees
              </h2>
              <p>
                Paid events require secure payment processing. All payments are
                subject to third-party payment provider terms.
              </p>
            </section>

            <section id="privacy">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Privacy Policy
              </h2>
              <p>
                Your data is handled according to our Privacy Policy. We ensure
                reasonable protection of your personal information.
              </p>
            </section>

            <section id="liability">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Limitation of Liability
              </h2>
              <p>
                We are not responsible for any damages arising from the use of
                the platform, including event-related issues or user interactions.
              </p>
            </section>

            <section id="changes">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Changes to Terms
              </h2>
              <p>
                We may update these terms at any time. Continued use of the
                platform means you accept the updated terms.
              </p>
            </section>

            <section id="contact">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Contact Us
              </h2>
              <p>
                If you have any questions about these Terms, please contact us at
                support@eventhub.com.
              </p>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
};

export default TermsPage;