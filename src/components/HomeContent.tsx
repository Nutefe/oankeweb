"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useLang } from "@/lib/LangContext";
import { ROUTES } from "@/constants/routes";

export default function HomeContent() {
  const { t } = useLang();
  const l = t.landing;

  const advantages = [
    { title: l.adv1_title, desc: l.adv1_desc, hasIcon: false },
    { title: l.adv2_title, desc: l.adv2_desc, hasIcon: false },
    { title: l.adv3_title, desc: l.adv3_desc, hasIcon: true },
    { title: l.adv4_title, desc: l.adv4_desc, hasIcon: false },
    { title: l.adv5_title, desc: l.adv5_desc, hasIcon: false },
    { title: l.adv6_title, desc: l.adv6_desc, hasIcon: false },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left copy */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 uppercase leading-tight mb-5">
              {l.hero_title}
            </h1>
            <h2 className="text-base font-bold text-gray-700 mb-3">{l.hero_subtitle}</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">{l.hero_desc}</p>
            <Link
              href={ROUTES.LOGIN}
              className="inline-block bg-teal-500 hover:bg-teal-400 text-white font-bold px-6 py-3 text-sm uppercase tracking-widest transition-colors"
            >
              {l.cta}
            </Link>
          </div>

          {/* Right — video placeholder */}
          <div className="bg-gray-600 rounded flex items-center justify-center h-56 md:h-72">
            <div className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center">
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3-column services ─────────────────────────────────── */}
      <section className="bg-gray-100 py-14 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Gestion des Articles */}
          <div>
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-widest mb-4">
              {l.s1_title}
            </h3>
            <div className="bg-gray-300 h-36 mb-4 rounded" />
            <p className="text-gray-500 text-xs leading-relaxed">{l.s1_desc}</p>
          </div>

          {/* Facturation — highlighted */}
          <div>
            <h3 className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-4">
              {l.s2_title}
            </h3>
            <div className="bg-gray-300 h-36 mb-4 rounded" />
            <p className="text-gray-500 text-xs leading-relaxed">{l.s2_desc}</p>
          </div>

          {/* Gestion des États */}
          <div>
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-widest mb-4">
              {l.s3_title}
            </h3>
            <div className="bg-gray-300 h-36 mb-4 rounded" />
            <p className="text-gray-500 text-xs leading-relaxed">{l.s3_desc}</p>
          </div>
        </div>
      </section>

      {/* ── Company Advantages ────────────────────────────────── */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header row */}
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 uppercase">
              {l.advantages_title}
            </h2>
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-gray-400" />
              <div className="w-8 h-8 bg-gray-500" />
              <div className="w-8 h-8 bg-gray-700" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Advantages grid — 2 cols, 3 rows */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {advantages.map((adv, i) => (
                <div key={i} className="flex gap-3 items-start">
                  {adv.hasIcon && (
                    <div className="w-10 h-10 bg-gray-200 flex-shrink-0 rounded" />
                  )}
                  <div>
                    <h4
                      className={`text-xs font-bold uppercase tracking-wide mb-1 ${
                        adv.hasIcon ? "text-teal-600" : "text-gray-800"
                      }`}
                    >
                      {adv.title}
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{adv.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature box */}
            <div className="bg-gray-700 text-white p-8 flex flex-col justify-center rounded gap-2">
              <p className="font-bold text-sm tracking-wide">{l.feature_box_line1}</p>
              <p className="font-bold text-sm tracking-wide">{l.feature_box_line2}</p>
              <p className="font-bold text-sm text-gray-300 tracking-wide">{l.feature_box_line3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> Oanke.{" "}
        {l.footer}
      </footer>
    </div>
  );
}
