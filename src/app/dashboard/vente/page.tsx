"use client";
import { useLang } from "@/lib/LangContext";
import { useUser } from "@/hooks/useUser";

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

export default function VentePage() {
  const { t } = useLang();
  const { user } = useUser();
  const role = user?.roles ?? "";

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.dashboard.vente_title}</h1>
      <p className="text-gray-500 mb-8">
        {t.dashboard.welcome}, <span className="font-semibold text-blue-700">{user?.username}</span>
      </p>

      {role === "admin" && (
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Ventes aujourd'hui" value="142" />
            <StatCard label="Chiffre d'affaires" value="2 840 000 FCFA" />
            <StatCard label="Clients actifs" value="38" />
            <StatCard label="Produits en stock" value="524" />
          </div>
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Gestion des utilisateurs</h2>
            <p className="text-gray-400 text-sm">Accédez à la gestion des comptes utilisateurs depuis le menu.</p>
          </div>
        </div>
      )}

      {role === "magasinier" && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Articles en stock" value="524" />
          <StatCard label="Entrées ce mois" value="87" />
          <StatCard label="Sorties ce mois" value="63" />
          <StatCard label="Alertes stock" value="5" />
        </div>
      )}

      {role === "secretaire" && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard label="Commandes du jour" value="12" />
            <StatCard label="Factures en attente" value="4" />
            <StatCard label="Clients enregistrés" value="38" />
          </div>
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Commandes récentes</h2>
            <ul className="flex flex-col gap-3">
              {["Commande #1042 — Dupont Marie", "Commande #1041 — Koné Ibrahima", "Commande #1040 — Sow Aïcha"].map((o) => (
                <li key={o} className="flex items-center justify-between text-sm text-gray-700 border-b border-gray-100 pb-2">
                  <span>{o}</span>
                  <span className="text-green-600 font-medium">Validée</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {role !== "admin" && role !== "magasinier" && role !== "secretaire" && (
        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
          <p className="text-gray-500 text-sm">Tableau de bord Vente chargé.</p>
        </div>
      )}
    </div>
  );
}
