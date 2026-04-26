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

export default function RestaurantPage() {
  const { t } = useLang();
  const { user } = useUser();
  const role = user?.roles ?? "";

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.dashboard.restaurant_title}</h1>
      <p className="text-gray-500 mb-8">
        {t.dashboard.welcome}, <span className="font-semibold text-blue-700">{user?.username}</span>
      </p>

      {role === "admin" && (
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Tables occupées" value="8 / 14" />
            <StatCard label="Commandes en cours" value="23" />
            <StatCard label="CA du jour" value="485 000 FCFA" />
            <StatCard label="Employés en service" value="6" />
          </div>
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Gestion des utilisateurs</h2>
            <p className="text-gray-400 text-sm">Accédez à la gestion des comptes depuis le menu latéral.</p>
          </div>
        </div>
      )}

      {role === "magasinier" && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Ingrédients en stock" value="148" />
          <StatCard label="Entrées ce mois" value="32" />
          <StatCard label="Sorties ce mois" value="29" />
          <StatCard label="Alertes stock" value="2" />
        </div>
      )}

      {role === "secretaire" && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard label="Réservations aujourd'hui" value="7" />
            <StatCard label="Factures en attente" value="3" />
            <StatCard label="Clients enregistrés" value="22" />
          </div>
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Commandes récentes</h2>
            <ul className="flex flex-col gap-3">
              {["Table 3 — Menu du jour x2", "Table 7 — Poulet rôti x1", "Table 1 — Boissons x4"].map((o) => (
                <li key={o} className="flex items-center justify-between text-sm text-gray-700 border-b border-gray-100 pb-2">
                  <span>{o}</span>
                  <span className="text-amber-600 font-medium">En cours</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {role !== "admin" && role !== "magasinier" && role !== "secretaire" && (
        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
          <p className="text-gray-500 text-sm">Tableau de bord Restaurant chargé.</p>
        </div>
      )}
    </div>
  );
}
