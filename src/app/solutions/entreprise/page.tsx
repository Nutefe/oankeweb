"use client";
import Navbar from "@/components/Navbar";
import { useLang } from "@/lib/LangContext";
import { useSubscription } from "@/lib/SubscriptionContext";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { CheckAbonnement, TypeAbonnements } from "@/types/type-abonnement";
import { useEffect, useState } from "react";
import { getTypeAbonnements } from "@/services/typeAbonnementService";
import { OffreAbonnementCell } from "@/components/abonnement/OffreAbonnementCell";

export default function EntreprisePage() {
  const { t } = useLang();
  const se = t.solutions_entreprise;
  const { setOffer } = useSubscription();
  const router = useRouter();
  const [plans, setPlans] = useState<TypeAbonnements[]>([]);

  function choosePlan(type: TypeAbonnements) {
    setOffer(type);
    router.push(
      `${ROUTES.ABONNEMENT}?key=${encodeURIComponent(type.id)}&typecommerce=${encodeURIComponent(2)}`,
    );
  }

  useEffect(() => {
    async function fetchPlans() {
      try {
        const data = await getTypeAbonnements();
        setPlans(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des types d'abonnement :",
          error,
        );
      }
    }
    fetchPlans();
  }, []);

  const productRows: { label: string; values: CheckAbonnement[] }[] = [
    { label: se.features.utilisateurs, values: ["10", "50", se.unlimited] },
    { label: se.features.sites, values: ["1", "5", se.unlimited] },
    { label: se.features.gestion_rh, values: ["non", "oui", "oui"] },
    { label: se.features.comptabilite, values: ["non", "oui", "oui"] },
    { label: se.features.api, values: ["non", "non", "oui"] },
    { label: se.features.roles, values: ["oui", "oui", "oui"] },
    { label: se.features.rapports, values: ["non", "oui", "oui"] },
    { label: se.features.multi_devise, values: ["non", "oui", "oui"] },
    { label: se.features.export, values: ["oui", "oui", "oui"] },
  ];

  const serviceRows: { label: string; values: CheckAbonnement[] }[] = [
    { label: se.services_features.onboarding, values: ["non", "oui", "oui"] },
    { label: se.services_features.formation, values: ["oui", "oui", "oui"] },
    {
      label: se.services_features.support_manager,
      values: ["non", "non", "oui"],
    },
    { label: se.services_features.messagerie, values: ["oui", "oui", "oui"] },
    { label: se.services_features.telephone, values: ["non", "oui", "oui"] },
    { label: se.services_features.sla, values: ["non", "non", "oui"] },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Navbar />

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section
        className="py-20 px-4"
        style={{
          background:
            "linear-gradient(135deg, #111827 0%, var(--oanke-navy) 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
            {se.hero_title}
          </h1>
          <p className="text-lg sm:text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
            {se.hero_subtitle}
          </p>
        </div>
      </section>

      {/* ── Plans ───────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {se.plans_title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-xl border p-8 flex flex-col items-center text-center shadow-sm ${
                  plan.recommander
                    ? "border-[#1E3080] bg-[#E8ECFF] ring-2 ring-[#1E3080]"
                    : "border-gray-200 bg-white"
                }`}
              >
                {plan.recommander && (
                  <span className="mb-3 text-xs font-bold uppercase tracking-wider text-[#1E3080] bg-[#E8ECFF] px-3 py-1 rounded-full">
                    {se.recommended}
                  </span>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {plan.libelle}
                </h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                  {plan.description}
                </p>
                <p
                  className={`text-2xl font-extrabold mb-6 ${plan.recommander ? "text-[#1E3080]" : "text-gray-900"}`}
                >
                  {plan.tarif}
                </p>
                <button
                  onClick={() => choosePlan(plan)}
                  className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors ${
                    plan.recommander
                      ? "bg-[#E8231A] hover:bg-[#C41C14] text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }`}
                >
                  {se.cta}
                </button>
              </div>
            ))}
          </div>

          {/* ── Comparison Table ──────────────────────────────────── */}
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="text-left px-6 py-4 font-semibold text-gray-700 w-1/2">
                    {se.products_title}
                  </th>
                  {plans.map((p) => (
                    <th
                      key={p.id}
                      className="px-4 py-4 font-semibold text-gray-700 text-center"
                    >
                      {p.libelle}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {productRows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-3 text-gray-700">{row.label}</td>
                    {row.values.map((v, j) => (
                      <td key={j} className="px-4 py-3">
                        <OffreAbonnementCell value={v} />
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Services sub-header */}
                <tr className="bg-[#E8ECFF] border-t border-b border-[#c5cdf7]">
                  <td
                    colSpan={4}
                    className="px-6 py-3 font-semibold text-[#1E3080] text-sm uppercase tracking-wider"
                  >
                    {se.services_title}
                  </td>
                </tr>

                {serviceRows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-3 text-gray-700">{row.label}</td>
                    {row.values.map((v, j) => (
                      <td key={j} className="px-4 py-3">
                        <OffreAbonnementCell value={v} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Note */}
          <p className="mt-6 text-xs text-gray-400 italic text-center max-w-3xl mx-auto">
            {se.note}
          </p>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm mt-auto">
        &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
        Oanke. Tous droits réservés.
      </footer>
    </div>
  );
}
