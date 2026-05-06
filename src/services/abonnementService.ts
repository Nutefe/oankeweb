import { API_GENERAL_BASE_URL } from "@/config/api";

export interface AbonnementPayload {
  categorieCommerce: string;
  typeAbonnement: number;
}

export async function saveAbonnement(payload: AbonnementPayload, token?: string): Promise<void> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_GENERAL_BASE_URL}/general/abonnements`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string })?.message ||
        "Erreur lors de la souscription à l'abonnement",
    );
  }
}
