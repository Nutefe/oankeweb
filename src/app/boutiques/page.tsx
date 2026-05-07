import ProtectedRoute from "@/components/ProtectedRoute";
import BoutiquesContent from "@/app/boutiques/BoutiquesContent";
import { DashboardSlug, isDashboardSlug } from "@/constants/routes";

interface BoutiquesPageProps {
  searchParams: Promise<{
    categorieCommerce?: string | string[];
    dashboard?: string | string[];
  }>;
}

function getSearchParam(
  value?: string | string[],
): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function BoutiquesPage({
  searchParams,
}: BoutiquesPageProps) {
  const params = await searchParams;
  const categorieCommerce = Number(getSearchParam(params.categorieCommerce));
  const dashboardParam = getSearchParam(params.dashboard);

  const initialCategorieCommerce =
    Number.isInteger(categorieCommerce) && categorieCommerce > 0
      ? categorieCommerce
      : null;
  const initialDashboard: DashboardSlug | null =
    dashboardParam && isDashboardSlug(dashboardParam) ? dashboardParam : null;

  return (
    <ProtectedRoute>
      <BoutiquesContent
        initialCategorieCommerce={initialCategorieCommerce}
        initialDashboard={initialDashboard}
      />
    </ProtectedRoute>
  );
}
