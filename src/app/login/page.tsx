"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/LangContext";
import { useUser } from "@/hooks/useUser";
import { login } from "@/services/authService";
import { saveUser } from "@/auth/authUtils";
import { validateLoginForm } from "@/schemas/loginSchema";
import { ROUTES } from "@/constants/routes";

export default function LoginPage() {
  const { t } = useLang();
  const l = t.login;
  const { setUser } = useUser();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");

    const validationErrors = validateLoginForm({ username, password });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);

    try {
      const response = await login(username, password);
      const storedUser = {
        token: response.token,
        username: response.username,
        email: response.email,
        roles: response.roles,
        typeCommerce: response.typeCommerce,
      };
      saveUser(storedUser);
      setUser(storedUser);

      if (response.typeCommerce.length === 1) {
        router.push(`/dashboard/${response.typeCommerce[0]}`);
      } else {
        router.push(ROUTES.CHOOSE_COMMERCE);
      }
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : l.error_generic);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 to-indigo-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-blue-700">Oanke</h1>
          <p className="text-gray-500 mt-2 text-sm">{l.subtitle}</p>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">{l.title}</h2>

        {serverError && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-6 text-sm">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {l.username_label}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={l.username_placeholder}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition"
              autoComplete="username"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {l.password_label}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={l.password_placeholder}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition"
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-bold py-3 rounded-xl transition-colors text-sm mt-2"
          >
            {isLoading ? l.loading : l.submit}
          </button>
        </form>
      </div>
    </div>
  );
}
