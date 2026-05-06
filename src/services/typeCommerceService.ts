import { API_GENERAL_BASE_URL } from "@/config/api";
import { TypeCommerces } from "@/types/type-commerce";

export async function getTypeCommerces(): Promise<TypeCommerces[]> {
  const res = await fetch(`${API_GENERAL_BASE_URL}/general/type/commerces`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string })?.message ||
        "Erreur lors de la récupération des types de commerce",
    );
  }
  return res.json() as Promise<TypeCommerces[]>;
}

export async function getOneTypeCommerce(id: number): Promise<TypeCommerces> {
  const res = await fetch(
    `${API_GENERAL_BASE_URL}/general/type/commerces/${id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string })?.message ||
        "Erreur lors de la récupération des types de commerce",
    );
  }
  return res.json() as Promise<TypeCommerces>;
}
