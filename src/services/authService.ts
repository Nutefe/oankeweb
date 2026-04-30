import { API_BASE_URL } from "@/config/api";
import { AuthResponse } from "@/types/auth";
import { LoginFormValues } from "@/schemas/loginSchema";
import { RegisterFormValues } from "@/schemas/registerSchema";

export async function login(credentials: LoginFormValues): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { message?: string })?.message || "Identifiants invalides");
  }
  return res.json() as Promise<AuthResponse>;
}

export async function register(
  data: Omit<RegisterFormValues, "confirmPassword">
): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string })?.message || "Registration failed"
    );
  }
}
