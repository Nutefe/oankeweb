import { Users } from "@/types/auth";

const USER_KEY = "oanke_user";

export function saveUser(user: Users): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  document.cookie = `auth-token=${user.token}; path=/; SameSite=Lax${secure}`;
}

export function getUser(): Users | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as Users) : null;
  } catch {
    return null;
  }
}

export function clearUser(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(USER_KEY);
  document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}
