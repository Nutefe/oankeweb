"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardSidebar from "@/components/DashboardSidebar";
import { usePathname } from "next/navigation";

function getCommerceType(pathname: string): string {
  if (pathname.includes("/dashboard/vente")) return "vente";
  if (pathname.includes("/dashboard/restaurant")) return "restaurant";
  if (pathname.includes("/dashboard/service")) return "service";
  return "vente";
}

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const commerceType = getCommerceType(pathname);

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar commerceType={commerceType} />
      <main className="flex-1 bg-gray-50 overflow-auto">{children}</main>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </ProtectedRoute>
  );
}
