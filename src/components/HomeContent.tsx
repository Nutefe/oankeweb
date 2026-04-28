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

  const advantages = [
    { title: l.adv1_title, desc: l.adv1_desc },
    { title: l.adv2_title, desc: l.adv2_desc },
    { title: l.adv3_title, desc: l.adv3_desc },
    { title: l.adv4_title, desc: l.adv4_desc },
    { title: l.adv5_title, desc: l.adv5_desc },
    { title: l.adv6_title, desc: l.adv6_desc },
  ];

  const services = [
    { title: l.service_articles_title, desc: l.service_articles_desc, highlight: false },
    { title: l.service_billing_title, desc: l.service_billing_desc, highlight: true },
    { title: l.service_states_title, desc: l.service_states_desc, highlight: false },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10">
          {/* Left: text + CTA */}
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              {l.hero_sub}
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6 uppercase">
              {l.hero_title}
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-md">{l.hero_detail}</p>
            <Link
              href={ROUTES.LOGIN}
              className="inline-block bg-teal-500 hover:bg-teal-400 text-white font-bold px-6 py-3 rounded text-sm uppercase tracking-wide transition-colors"
            >
              {l.cta}
            </Link>
          </div>

          {/* Right: video placeholder */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-sm aspect-video bg-gray-300 rounded flex items-center justify-center shadow-inner">
              <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow">
                <svg className="w-8 h-8 text-gray-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.5 5.5l9 4.5-9 4.5V5.5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services: 3 columns */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 gap-0">
            {services.map((svc) => (
              <div key={svc.title} className="px-0 md:px-8 py-6 md:py-0 first:pl-0 last:pr-0">
                <h3
                  className={`text-sm font-bold uppercase tracking-wider mb-4 ${
                    svc.highlight ? "text-teal-500" : "text-gray-800"
                  }`}
                >
                  {svc.title}
                </h3>
                <div className="w-full aspect-video bg-gray-200 rounded mb-4" />
                <p className="text-sm text-gray-600 leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Left: title + 2×3 grid */}
            <div className="flex-1">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 uppercase mb-10">
                {l.advantages_title}
              </h2>
              <div className="grid grid-cols-2 gap-x-10 gap-y-7">
                {advantages.map((adv, i) => (
                  <div key={i}>
                    <h4
                      className={`text-xs font-bold uppercase tracking-wide mb-1 ${
                        i === 2 ? "text-teal-500" : "text-gray-800"
                      }`}
                    >
                      {adv.title}
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{adv.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: promo dark box */}
            <div className="md:w-52 flex-shrink-0 self-center">
              <div className="bg-gray-700 text-white rounded p-8 text-center">
                {l.promo_lines.map((line, i) => (
                  <p
                    key={i}
                    className={`font-extrabold uppercase tracking-wider leading-snug ${
                      i === 0 ? "text-2xl mb-1" : i === 1 ? "text-lg mb-1" : "text-base"
                    }`}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription plans */}
      <section className="py-20 px-4 bg-white">
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

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> Oanke. {l.footer}
      </footer>
    </div>
  );
}
