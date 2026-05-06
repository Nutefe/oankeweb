import { API_AUTH_BASE_URL, API_GENERAL_BASE_URL } from "@/config/api";
import { AuthResponse } from "@/types/auth";
import { LoginFormValues } from "@/schemas/loginSchema";
import { RegisterFormValues } from "@/schemas/registerSchema";

export async function login(
  credentials: LoginFormValues,
): Promise<AuthResponse> {
  const res = await fetch(`${API_AUTH_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string })?.message || "Identifiants invalides",
    );
  }
  return res.json() as Promise<AuthResponse>;
}

export async function register(
  data: Omit<RegisterFormValues, "confirmPassword">,
): Promise<void> {
  const res = await fetch(`${API_AUTH_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string })?.message || "Registration failed",
    );
  }
}

export async function abonnement(data: {
  offerId: number;
  paymentMethod: string;
  paymentData: any;
}): Promise<void> {
  const res = await fetch(`${API_GENERAL_BASE_URL}/api/general/abonnements`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string })?.message || "Subscription failed",
    );
  }
}
