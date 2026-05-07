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

export async function getUserTypeCommerces(
  token?: string,
): Promise<TypeCommerces[]> {
  // const headers: Record<string, string> = {
  //   "Content-Type": "application/json",
  // };
  // if (token) {
  //   headers["Authorization"] = `Bearer ${token}`;
  // }

  // : { "Content-Type": "application/json" },
  const res = await fetch(
    `${API_GENERAL_BASE_URL}/general/type/commerces/for/user`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
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
