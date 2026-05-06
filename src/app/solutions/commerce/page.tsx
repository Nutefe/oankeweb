"use client";
import Navbar from "@/components/Navbar";
import { useLang } from "@/lib/LangContext";
import { useSubscription } from "@/lib/SubscriptionContext";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { useEffect, useState } from "react";
import { CheckAbonnement, TypeAbonnements } from "@/types/type-abonnement";
import { getTypeAbonnements } from "@/services/typeAbonnementService";
import { OffreAbonnementCell } from "@/components/abonnement/OffreAbonnementCell";

export default function CommercePage() {
  const { t } = useLang();
  const sc = t.solutions_commerce;
  const { setOffer } = useSubscription();
  const router = useRouter();
  const [plans, setPlans] = useState<TypeAbonnements[]>([]);

  function choosePlan(type: TypeAbonnements) {
    setOffer(type);
    router.push(`${ROUTES.ABONNEMENT}?key=${encodeURIComponent(type.id)}&typecommerce=1`);
  }

  // Fetch plans from API
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

  const offreProductRows: { label: string; values: CheckAbonnement[] }[] = [
    { label: sc.features.acces_web, values: ["oui", "oui", "oui"] },
    { label: sc.features.caisses, values: ["1", "2", "4"] },
    { label: sc.features.utilisateurs, values: ["5", "10", "30"] },
    { label: sc.features.inventaire, values: ["oui", "oui", "oui"] },
    { label: sc.features.vente_gros, values: ["oui", "oui", "oui"] },
    { label: sc.features.synchro, values: ["non", "oui", "oui"] },
    {
      label: sc.features.marketplace,
      values: ["non", sc.marketplace_1go, sc.marketplace_5go],
    },
    { label: sc.features.fidelisation, values: ["non", "oui", "oui"] },
    { label: sc.features.rapport_stock, values: ["oui", "oui", "oui"] },
    { label: sc.features.rapport_avance, values: ["non", "oui", "oui"] },
  ];

  const offreServiceRows: { label: string; values: CheckAbonnement[] }[] = [
    { label: sc.services_features.mpi, values: ["non", "non", "oui"] },
    { label: sc.services_features.roles, values: ["non", "non", "oui"] },
    { label: sc.services_features.formation, values: ["oui", "oui", "oui"] },
    { label: sc.services_features.messagerie, values: ["oui", "oui", "oui"] },
    { label: sc.services_features.telephone, values: ["non", "non", "oui"] },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Navbar />

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section
        className="py-20 px-4"
        style={{
          background:
            "linear-gradient(135deg, var(--oanke-navy) 0%, var(--oanke-red) 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
            {sc.hero_title}
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            {sc.hero_subtitle}
          </p>
        </div>
      </section>

      {/* ── Plans ───────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {sc.plans_title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
            {plans.map((plan) => (
              <div
                key={plan.libelle}
                className={`rounded-xl border p-8 flex flex-col items-center text-center shadow-sm ${
                  plan.recommander
                    ? "border-[#1E3080] bg-[#E8ECFF] ring-2 ring-[#1E3080]"
                    : "border-gray-200 bg-white"
                }`}
              >
                {plan.recommander && (
                  <span className="mb-3 text-xs font-bold uppercase tracking-wider text-[#1E3080] bg-[#E8ECFF] px-3 py-1 rounded-full">
                    {sc.recommended}
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
                  {sc.cta}
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
                    {sc.products_title}
                  </th>
                  {plans.map((p) => (
                    <th
                      key={p.libelle}
                      className="px-4 py-4 font-semibold text-gray-700 text-center"
                    >
                      {p.libelle}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {offreProductRows.map((row, i) => (
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
                    {sc.services_title}
                  </td>
                </tr>

                {offreServiceRows.map((row, i) => (
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
            {sc.note}
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
