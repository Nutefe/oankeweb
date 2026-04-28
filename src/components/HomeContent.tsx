"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import SubscriptionCard from "@/components/SubscriptionCard";
import { useLang } from "@/lib/LangContext";
import { ROUTES } from "@/constants/routes";

export default function HomeContent() {
  const { t } = useLang();
  const l = t.landing;

  const plans = [
    {
      name: l.plan_basic,
      price: l.plan_basic_price,
      description: l.plan_basic_desc,
      features: l.features_basic,
      highlighted: false,
    },
    {
      name: l.plan_pro,
      price: l.plan_pro_price,
      description: l.plan_pro_desc,
      features: l.features_pro,
      highlighted: true,
    },
    {
      name: l.plan_enterprise,
      price: l.plan_enterprise_price,
      description: l.plan_enterprise_desc,
      features: l.features_enterprise,
      highlighted: false,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-16 px-4 border-b border-gray-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              {l.hero_title}
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
              {l.hero_subtitle}
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md">
              {l.hero_sub}
            </p>
            <Link
              href={ROUTES.LOGIN}
              className="inline-block bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 transition-colors"
            >
              {l.cta}
            </Link>
          </div>

          {/* Right – video placeholder */}
          <div className="relative bg-gray-400 aspect-video flex items-center justify-center rounded-sm shadow-inner">
            <div className="w-16 h-16 rounded-full border-4 border-white border-opacity-70 flex items-center justify-center">
              <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3-Column Services ─────────────────────────────────────────── */}
      <section className="py-14 px-4 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">
          {/* Service 1 – Articles */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-4">
              {l.s1_title}
            </h3>
            <div className="bg-gray-200 h-36 mb-4 rounded-sm" />
            <p className="text-xs text-gray-500 leading-relaxed">{l.s1_desc}</p>
          </div>

          {/* Service 2 – Billing (highlighted) */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-teal-500 mb-4">
              {l.s2_title}
            </h3>
            <div className="bg-gray-200 h-36 mb-4 rounded-sm" />
            <p className="text-xs text-gray-500 leading-relaxed">{l.s2_desc}</p>
          </div>

          {/* Service 3 – States */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-4">
              {l.s3_title}
            </h3>
            <div className="bg-gray-200 h-36 mb-4 rounded-sm" />
            <p className="text-xs text-gray-500 leading-relaxed">{l.s3_desc}</p>
          </div>
        </div>
      </section>

      {/* ── Advantages ────────────────────────────────────────────────── */}
      <section className="py-14 px-4 bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          {/* Heading row */}
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              {l.advantages_title}
            </h2>
            <div className="hidden sm:flex gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-sm" />
              <div className="w-8 h-8 bg-gray-400 rounded-sm" />
              <div className="w-8 h-8 bg-gray-500 rounded-sm" />
            </div>
          </div>

          {/* Content grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Advantage items – 2 columns, 3 rows */}
            <div className="md:col-span-2 grid grid-cols-2 gap-x-8 gap-y-7">
              {l.advantages.map((adv, i) => (
                <div key={i} className="flex gap-3 items-start">
                  {adv.hasImage && (
                    <div className="w-10 h-10 bg-gray-200 flex-shrink-0 rounded-sm" />
                  )}
                  <div>
                    <h4
                      className={`text-xs font-bold uppercase tracking-wide mb-1 ${
                        adv.highlight ? "text-teal-500" : "text-gray-800"
                      }`}
                    >
                      {adv.title}
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{adv.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Highlighted callout box */}
            <div className="bg-gray-600 text-white flex flex-col justify-center items-center text-center p-8 rounded-sm">
              <p className="text-sm font-semibold mb-2">{l.adv_highlight_1}</p>
              <p className="text-2xl font-extrabold mb-2">{l.adv_highlight_2}</p>
              <p className="text-sm font-semibold tracking-widest uppercase">{l.adv_highlight_3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Subscription Plans ────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white border-b border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-14">{l.plans_title}</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 items-center">
          {plans.map((plan) => (
            <SubscriptionCard
              key={plan.name}
              name={plan.name}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              highlighted={plan.highlighted}
              ctaLabel={l.choose_plan}
              recommendedLabel={l.recommended}
            />
          ))}
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> Oanke.{" "}
        {l.footer}
      </footer>
    </div>
  );
}
