import { API_GENERAL_BASE_URL } from "@/config/api";

export interface AbonnementPayload {
  categorieCommerce: number;
  typeAbonnement: number;
}

export async function saveAbonnement(
  payload: AbonnementPayload,
  token?: string,
): Promise<void> {
  // const headers: Record<string, string> = {
  //   "Content-Type": "application/json",
  // };
  // if (token) {
  //   console.log(`Auth ${token}`);

  //   headers["Authorization"] = `Bearer ${token}`;
  // }
  // let headers: HeadersInit = { "Content-Type": "application/json" };
  // if (token) headers = { ...headers, Authorization: `Bearer ${token}` };
  // console.log(headers);
  // console.log(payload);

  const res = await fetch(`${API_GENERAL_BASE_URL}/general/abonnements`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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
