export const DASHBOARD_SLUGS = ["vente", "restaurant", "service"] as const;

export type DashboardSlug = (typeof DASHBOARD_SLUGS)[number];

export const ROUTES = {
  HOME: "/",
  SERVICES: "/services",
  SUPPORT: "/support",
  AIDE: "/aide",
  LOGIN: "/login",
  REGISTER: "/register",
  CHOOSE_COMMERCE: "/choose-commerce",
  BOUTIQUES: "/boutiques",
  SOLUTIONS: {
    COMMERCE: "/solutions/commerce",
    ENTREPRISE: "/solutions/entreprise",
  },
  ABONNEMENT: "/abonnement",
  DASHBOARD: {
    VENTE: "/dashboard/vente",
    RESTAURANT: "/dashboard/restaurant",
    SERVICE: "/dashboard/service",
  },
} as const;

export function isDashboardSlug(value: string): value is DashboardSlug {
  return DASHBOARD_SLUGS.includes(value as DashboardSlug);
}

export function normalizeDashboardSlug(value: string): DashboardSlug {
  if (value === "restaurant") return "restaurant";
  if (value === "service") return "service";
  return "vente";
}

export function getDashboardRoute(dashboard: DashboardSlug): string {
  if (dashboard === "restaurant") return ROUTES.DASHBOARD.RESTAURANT;
  if (dashboard === "service") return ROUTES.DASHBOARD.SERVICE;
  return ROUTES.DASHBOARD.VENTE;
}

export function getBoutiquesRoute(
  categorieCommerce: number,
  dashboard: DashboardSlug,
): string {
  const params = new URLSearchParams({
    categorieCommerce: String(categorieCommerce),
    dashboard,
  });

  return `${ROUTES.BOUTIQUES}?${params.toString()}`;
}
