"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useLang } from "@/lib/LangContext";
import { useUser } from "@/hooks/useUser";
import { ROUTES } from "@/constants/routes";

function ChooseCommerceContent() {
  const { t } = useLang();
  const { user } = useUser();
  const router = useRouter();
  const c = t.choose;

  useEffect(() => {
    if (user && user.typeCommerce.length === 1) {
      router.push(`/dashboard/${user.typeCommerce[0]}`);
    }
  }, [user, router]);

  if (!user) return null;

  const typeLabels: Record<string, { label: string; desc: string; route: string }> = {
    vente: { label: c.vente, desc: c.vente_desc, route: ROUTES.DASHBOARD.VENTE },
    restaurant: { label: c.restaurant, desc: c.restaurant_desc, route: ROUTES.DASHBOARD.RESTAURANT },
    service: { label: c.service, desc: c.service_desc, route: ROUTES.DASHBOARD.SERVICE },
  };

  const icons: Record<string, React.ReactNode> = {
    vente: (
      <svg className="w-10 h-10 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-4H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    restaurant: (
      <svg className="w-10 h-10 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    service: (
      <svg className="w-10 h-10 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-3">{c.title}</h1>
      <p className="text-gray-500 text-center mb-12 max-w-lg">{c.subtitle}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-3xl">
        {user.typeCommerce.map((type) => {
          const info = typeLabels[type];
          if (!info) return null;
          return (
            <button
              key={type}
              onClick={() => router.push(info.route)}
              className="flex flex-col items-center gap-4 bg-white rounded-2xl shadow p-8 border-2 border-gray-100 hover:border-blue-700 hover:shadow-md transition-all group"
            >
              {icons[type]}
              <div className="text-center">
                <p className="text-lg font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
                  {info.label}
                </p>
                <p className="text-sm text-gray-500 mt-1">{info.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ChooseCommercePage() {
  return (
    <ProtectedRoute>
      <ChooseCommerceContent />
    </ProtectedRoute>
  );
}
