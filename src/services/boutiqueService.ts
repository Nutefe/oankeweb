import { API_GENERAL_BASE_URL } from "@/config/api";
import { Boutique, CreateBoutiquePayload } from "@/types/boutique";

export async function getBoutiques(
  token?: string,
  categorieCommerce?: number,
): Promise<Boutique[]> {
  const searchParams = new URLSearchParams();
  if (typeof categorieCommerce === "number" && categorieCommerce > 0) {
    searchParams.set("categorieCommerce", String(categorieCommerce));
  }

  const url = `${API_GENERAL_BASE_URL}/vente/boutiques${
    searchParams.size ? `?${searchParams.toString()}` : ""
  }`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string })?.message ||
        "Erreur lors de la récupération des boutiques",
    );
  }

  return res.json() as Promise<Boutique[]>;
}

export async function createBoutique(
  payload: CreateBoutiquePayload,
  token?: string,
): Promise<Boutique> {
  const res = await fetch(`${API_GENERAL_BASE_URL}/vente/boutiques`, {
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
        "Erreur lors de la création de la boutique",
    );
  }

  return res.json() as Promise<Boutique>;
}
