import { API_GENERAL_BASE_URL } from "@/config/api";
import { CategorieCommerces } from "@/types/categorie-commerce";

export async function getCategorieCommerces(): Promise<CategorieCommerces[]> {
  const res = await fetch(
    `${API_GENERAL_BASE_URL}/general/categorie/commerces`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string })?.message ||
        "Erreur lors de la récupération des catégories de commerce",
    );
  }
  return res.json() as Promise<CategorieCommerces[]>;
}

export async function getOneCategorieCommerce(
  id: number,
): Promise<CategorieCommerces> {
  const res = await fetch(
    `${API_GENERAL_BASE_URL}/general/categorie/commerces/${id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string })?.message ||
        "Erreur lors de la récupération des catégories de commerce",
    );
  }
  return res.json() as Promise<CategorieCommerces>;
}

export async function getCategorieCommerceByType(
  id: number,
): Promise<CategorieCommerces[]> {
  const res = await fetch(
    `${API_GENERAL_BASE_URL}/general/categorie/commerces/type/${id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string })?.message ||
        "Erreur lors de la récupération des catégories de commerce",
    );
  }
  return res.json() as Promise<CategorieCommerces[]>;
}
