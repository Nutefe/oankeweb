"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import SubscriptionCard from "@/components/SubscriptionCard";
import { useLang } from "@/lib/LangContext";
import { ROUTES } from "@/constants/routes";

export default function Home() {
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 bg-gradient-to-br from-blue-700 to-indigo-800 text-white">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight max-w-3xl">
          {l.hero_title}
        </h1>
        <p className="text-lg sm:text-xl text-blue-100 mb-10 max-w-xl">{l.hero_sub}</p>
        <Link
          href={ROUTES.LOGIN}
          className="inline-block bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg"
        >
          {l.cta}
        </Link>
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
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        &copy; {new Date().getFullYear()} Oanke. Tous droits réservés.
      </footer>
    </div>
  );
}
