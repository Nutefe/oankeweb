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

export default function ServicePage() {
  const { t } = useLang();
  const { user } = useUser();
  const role = user?.roles ?? "";

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.dashboard.service_title}</h1>
      <p className="text-gray-500 mb-8">
        {t.dashboard.welcome}, <span className="font-semibold text-blue-700">{user?.username}</span>
      </p>

      {role === "admin" && (
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Interventions ce mois" value="34" />
            <StatCard label="En attente" value="7" />
            <StatCard label="CA du mois" value="1 200 000 FCFA" />
            <StatCard label="Techniciens actifs" value="4" />
          </div>
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Gestion des utilisateurs</h2>
            <p className="text-gray-400 text-sm">Accédez à la gestion des comptes depuis le menu latéral.</p>
          </div>
        </div>
      )}

      {role === "magasinier" && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Pièces en stock" value="312" />
          <StatCard label="Entrées ce mois" value="45" />
          <StatCard label="Sorties ce mois" value="38" />
          <StatCard label="Alertes stock" value="3" />
        </div>
      )}

      {role === "secretaire" && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard label="RDV aujourd'hui" value="5" />
            <StatCard label="Factures en attente" value="6" />
            <StatCard label="Clients enregistrés" value="54" />
          </div>
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Agenda du jour</h2>
            <ul className="flex flex-col gap-3">
              {["9h00 — Réparation climatiseur — M. Touré", "11h00 — Installation réseau — Société ABC", "14h30 — Maintenance groupe — Mme Diallo"].map((o) => (
                <li key={o} className="flex items-center justify-between text-sm text-gray-700 border-b border-gray-100 pb-2">
                  <span>{o}</span>
                  <span className="text-blue-600 font-medium">Planifié</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {role !== "admin" && role !== "magasinier" && role !== "secretaire" && (
        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
          <p className="text-gray-500 text-sm">Tableau de bord Service chargé.</p>
        </div>
      )}
    </div>
  );
}
