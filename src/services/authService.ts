import { API_BASE_URL } from "@/config/api";
import { AuthResponse } from "@/types/auth";

export async function login(username: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { message?: string })?.message || "Identifiants invalides");
  }
  return res.json() as Promise<AuthResponse>;
}
