"use client";
import Navbar from "@/components/Navbar";
import { useLang } from "@/lib/LangContext";

const icons = [
  // Shopping cart
  <svg key="vente" className="w-12 h-12 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-4H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>,
  // Restaurant
  <svg key="restaurant" className="w-12 h-12 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  </svg>,
  // Service
  <svg key="service" className="w-12 h-12 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>,
];

export default function ServicesContent() {
  const { t } = useLang();
  const s = t.services;

  const serviceCards = [
    { title: s.s1_title, desc: s.s1_desc, icon: icons[0] },
    { title: s.s2_title, desc: s.s2_desc, icon: icons[1] },
    { title: s.s3_title, desc: s.s3_desc, icon: icons[2] },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-16">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{s.title}</h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">{s.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {serviceCards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-2xl shadow p-8 flex flex-col items-center text-center gap-4 border border-gray-100 hover:shadow-md transition-shadow"
            >
              {card.icon}
              <h2 className="text-xl font-bold text-gray-800">{card.title}</h2>
              <p className="text-gray-500 text-sm">{card.desc}</p>
            </div>
          ))}
        </div>
      </main>
      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> Oanke.
      </footer>
    </div>
  );
}
