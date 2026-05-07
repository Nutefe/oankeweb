import { cookies } from "next/headers";
import ProtectedRoute from "@/components/ProtectedRoute";
import BoutiquesContent from "@/app/boutiques/BoutiquesContent";
import { DashboardSlug, isDashboardSlug } from "@/constants/routes";
import { getBoutiques } from "@/services/boutiqueService";
import { Boutique } from "@/types/boutique";

interface BoutiquesPageProps {
  searchParams: Promise<{
    categorieCommerce?: string | string[];
    dashboard?: string | string[];
  }>;
}

function getSearchParam(value?: string | string[]): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function BoutiquesPage({
  searchParams,
}: BoutiquesPageProps) {
  const params = await searchParams;
  const categorieCommerce = Number(getSearchParam(params.categorieCommerce));
  const dashboardParam = getSearchParam(params.dashboard);
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  const initialCategorieCommerce =
    Number.isInteger(categorieCommerce) && categorieCommerce > 0
      ? categorieCommerce
      : null;
  const initialDashboard: DashboardSlug | null =
    dashboardParam && isDashboardSlug(dashboardParam) ? dashboardParam : null;

  let initialBoutiques: Boutique[] = [];
  let initialError = "";

  if (token && initialCategorieCommerce && initialDashboard) {
    try {
      initialBoutiques = await getBoutiques(token, initialCategorieCommerce);
    } catch (error) {
      initialError =
        error instanceof Error
          ? error.message
          : "Impossible de charger les boutiques.";
    }
  }

  return (
    <ProtectedRoute>
      <BoutiquesContent
        initialCategorieCommerce={initialCategorieCommerce}
        initialDashboard={initialDashboard}
        initialBoutiques={initialBoutiques}
        initialError={initialError}
      />
    </ProtectedRoute>
  );
}
