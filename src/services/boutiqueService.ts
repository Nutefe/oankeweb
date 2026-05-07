import { API_GENERAL_BASE_URL } from "@/config/api";
import { Boutique, CreateBoutiquePayload } from "@/types/boutique";

export const DEFAULT_BOUTIQUE_REQUEST_ERROR = "BOUTIQUE_REQUEST_FAILED";

function createRequestError(message?: string): Error {
  return new Error(message ?? DEFAULT_BOUTIQUE_REQUEST_ERROR);
}

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
    throw createRequestError((err as { message?: string })?.message);
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
    throw createRequestError((err as { message?: string })?.message);
  }

  return res.json() as Promise<Boutique>;
}
