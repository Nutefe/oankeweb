"use client";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/LangContext";
import { useUser } from "@/hooks/useUser";
import { ROUTES } from "@/constants/routes";

interface DashboardSidebarProps {
  commerceType: string;
}

export default function DashboardSidebar({ commerceType }: DashboardSidebarProps) {
  const { t } = useLang();
  const { user, logout } = useUser();
  const router = useRouter();

  const role = user?.roles ?? "";

  const menuItems = (() => {
    if (role === "admin") return t.dashboard.admin_menu;
    if (role === "magasinier") return t.dashboard.magasinier_menu;
    if (role === "secretaire") return t.dashboard.secretaire_menu;
    return t.dashboard.admin_menu;
  })();

  const roleLabel = (() => {
    if (role === "admin") return t.dashboard.role_admin;
    if (role === "magasinier") return t.dashboard.role_magasinier;
    if (role === "secretaire") return t.dashboard.role_secretaire;
    return role;
  })();

  const commerceLabel = (() => {
    if (commerceType === "vente") return t.choose.vente;
    if (commerceType === "restaurant") return t.choose.restaurant;
    if (commerceType === "service") return t.choose.service;
    return commerceType;
  })();

  function handleLogout() {
    logout();
    router.push(ROUTES.LOGIN);
  }

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-700">
        <p className="text-xl font-bold text-white">Oanke</p>
        <p className="text-xs text-amber-400 mt-1 uppercase tracking-wider">{commerceLabel}</p>
      </div>

      {/* User info */}
      {user && (
        <div className="px-6 py-4 border-b border-gray-700">
          <p className="text-sm font-semibold text-white truncate">{user.username}</p>
          <p className="text-xs text-gray-400 truncate">{roleLabel}</p>
        </div>
      )}

      {/* Menu */}
      <nav className="flex-1 px-4 py-4 flex flex-col gap-1">
        {menuItems.map((item, i) => (
          <button
            key={i}
            className="text-left px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            {item}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          {t.dashboard.logout}
        </button>
      </div>
    </aside>
  );
}
