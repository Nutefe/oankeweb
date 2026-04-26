"use client";
import Navbar from "@/components/Navbar";
import { useLang } from "@/lib/LangContext";

export default function AideContent() {
  const { t } = useLang();
  const a = t.aide;

  const guides = [
    { label: a.guide_vente },
    { label: a.guide_restaurant },
    { label: a.guide_service },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-16">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{a.title}</h1>
          <p className="text-lg text-gray-500">{a.subtitle}</p>
        </div>

        {/* Quick start */}
        <div className="bg-white rounded-2xl shadow p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">{a.start_title}</h2>
          <p className="text-gray-500">{a.start_desc}</p>
        </div>

        {/* Guides */}
        <div className="bg-white rounded-2xl shadow p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{a.guide_title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {guides.map((g) => (
              <button
                key={g.label}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-blue-200 text-blue-700 font-medium hover:bg-blue-50 transition-colors text-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Video tutorials */}
        <div className="bg-white rounded-2xl shadow p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">{a.video_title}</h2>
          <p className="text-gray-500 mb-6">{a.video_desc}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200"
              >
                <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> Oanke.
      </footer>
    </div>
  );
}
