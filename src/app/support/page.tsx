"use client";
import Navbar from "@/components/Navbar";
import { useLang } from "@/lib/LangContext";

export default function SupportPage() {
  const { t } = useLang();
  const s = t.support;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-16">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{s.title}</h1>
          <p className="text-lg text-gray-500">{s.subtitle}</p>
        </div>

        {/* Contact info */}
        <div className="bg-white rounded-2xl shadow p-8 mb-10 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{s.contact_title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{s.email_label}</span>
              <span className="text-gray-800 font-medium">{s.email_value}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{s.phone_label}</span>
              <span className="text-gray-800 font-medium">{s.phone_value}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{s.hours_label}</span>
              <span className="text-gray-800 font-medium">{s.hours_value}</span>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{s.faq_title}</h2>
          <div className="flex flex-col gap-6">
            <div>
              <p className="font-semibold text-gray-800 mb-1">{s.faq_q1}</p>
              <p className="text-gray-500 text-sm">{s.faq_a1}</p>
            </div>
            <hr className="border-gray-100" />
            <div>
              <p className="font-semibold text-gray-800 mb-1">{s.faq_q2}</p>
              <p className="text-gray-500 text-sm">{s.faq_a2}</p>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        &copy; {new Date().getFullYear()} Oanke.
      </footer>
    </div>
  );
}
