import { API_GENERAL_BASE_URL } from "@/config/api";
import { TypeAbonnements } from "@/types/type-abonnement";

export async function getTypeAbonnements(): Promise<TypeAbonnements[]> {
  const res = await fetch(`${API_GENERAL_BASE_URL}/general/type/abonnement`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string })?.message ||
        "Erreur lors de la récupération des types d'abonnement",
    );
  }
  return res.json() as Promise<TypeAbonnements[]>;
}

export async function getOneTypeAbonnements(id: number): Promise<TypeAbonnements> {
  const res = await fetch(`${API_GENERAL_BASE_URL}/general/type/abonnement/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string })?.message ||
        "Erreur lors de la récupération des types d'abonnement",
    );
  }
  return res.json() as Promise<TypeAbonnements>;
}
