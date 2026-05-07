"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useLang } from "@/lib/LangContext";
import { useUser } from "@/hooks/useUser";
import { TypeCommerces } from "@/types/type-commerce";
import { getUserTypeCommerces } from "@/services/typeCommerceService";
import { IconTypeCommerce } from "@/components/type-commerce/IconeTypeCommerce";
import { getUser } from "@/auth/authUtils";
import { getBoutiquesRoute, isDashboardSlug } from "@/constants/routes";

function ChooseCommerceContent() {
  const { t } = useLang();
  const { user } = useUser();
  const router = useRouter();
  const c = t.choose;

  const [userTypeCommerce, setUserTypeCommerce] = useState<TypeCommerces[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchUserTypeCommerce() {
      try {
        const token = user?.token ?? getUser()?.token;
        if (!token) return;

        const data = await getUserTypeCommerces(token);
        if (!cancelled) setUserTypeCommerce(data);
      } catch (error) {
        console.error("Erreur lors de la récupération :", error);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    }

    fetchUserTypeCommerce();
    return () => {
      cancelled = true;
    };
  }, [user?.token]);

  useEffect(() => {
    if (!loaded) return;
    if (userTypeCommerce.length === 1) {
      router.replace(
        getBoutiquesRoute(
          userTypeCommerce[0].id,
          isDashboardSlug(userTypeCommerce[0].dashboard)
            ? userTypeCommerce[0].dashboard
            : "vente",
        ),
      );
    }
  }, [loaded, userTypeCommerce, router]);

  if (!loaded) return null;
  if (userTypeCommerce.length === 0) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-3">{c.title}</h1>
      <p className="text-gray-500 text-center mb-12 max-w-lg">{c.subtitle}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-3xl">
        {userTypeCommerce.map((type) => (
          <button
            key={type.id}
            onClick={() =>
              router.push(
                getBoutiquesRoute(
                  type.id,
                  isDashboardSlug(type.dashboard) ? type.dashboard : "vente",
                ),
              )
            }
            className="flex flex-col items-center gap-4 bg-white rounded-2xl shadow p-8 border-2 border-gray-100 hover:border-blue-700 hover:shadow-md transition-all group"
          >
            {IconTypeCommerce[type.dashboard]}
            <div className="text-center">
              <p className="text-lg font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
                {type.libelle}
              </p>
              <p className="text-sm text-gray-500 mt-1">{type.libelle}</p>
            </div>
          </button>
        ))}
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
