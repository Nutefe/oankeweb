"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/LangContext";
import { register } from "@/services/authService";
import { createRegisterSchema } from "@/schemas/registerSchema";
import { ROUTES } from "@/constants/routes";

export default function RegisterPage() {
  const { t } = useLang();
  const r = t.register;
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [touched, setTouched] = useState<{
    username?: boolean;
    email?: boolean;
    password?: boolean;
    confirmPassword?: boolean;
  }>({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const registerSchema = useMemo(
    () =>
      createRegisterSchema({
        username_required: r.validation.username_required,
        username_min: r.validation.username_min,
        email_required: r.validation.email_required,
        email_invalid: r.validation.email_invalid,
        password_min: r.validation.password_min,
        confirmPassword_required: r.validation.confirmPassword_required,
        confirmPassword_mismatch: r.validation.confirmPassword_mismatch,
      }),
    [r]
  );

  type RegisterField = "username" | "email" | "password" | "confirmPassword";
  type RegisterErrors = { username?: string; email?: string; password?: string; confirmPassword?: string };
  type RegisterTouched = { username?: boolean; email?: boolean; password?: boolean; confirmPassword?: boolean };

  function validateField(field: RegisterField, value: string) {
    const values = { username, email, password, confirmPassword, [field]: value };
    const result = registerSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors((prev: RegisterErrors) => ({ ...prev, [field]: fieldErrors[field as keyof typeof fieldErrors]?.[0] }));
    } else {
      setErrors((prev: RegisterErrors) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleBlur(field: RegisterField, value: string) {
    setTouched((prev: RegisterTouched) => ({ ...prev, [field]: true }));
    validateField(field, value);
  }

  function handleChange(field: RegisterField, value: string) {
    if (field === "username") setUsername(value);
    else if (field === "email") setEmail(value);
    else if (field === "password") setPassword(value);
    else setConfirmPassword(value);
    if (touched[field]) validateField(field, value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    setSuccessMessage("");

    const result = registerSchema.safeParse({ username, email, password, confirmPassword });
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        username: fieldErrors.username?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
      });
      setTouched({ username: true, email: true, password: true, confirmPassword: true });
      return;
    }
    setErrors({});
    setIsLoading(true);

    try {
      const { confirmPassword: _cp, ...registerData } = result.data;
      await register(registerData);
      setSuccessMessage(r.success);
      setTimeout(() => router.push(ROUTES.LOGIN), 2000);
    } catch (err: unknown) {
      setServerError(err instanceof Error && err.message ? err.message : r.error_generic);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, var(--oanke-navy) 0%, var(--oanke-red) 100%)" }}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Image src="/logo.png" alt="Oanke" width={140} height={50} className="h-12 w-auto mb-2" />
          <p className="text-gray-500 mt-2 text-sm">{r.subtitle}</p>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">{r.title}</h2>

        {serverError && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-6 text-sm">
            {serverError}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 mb-6 text-sm">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {r.username_label}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => handleChange("username", e.target.value)}
              onBlur={(e) => handleBlur("username", e.target.value)}
              placeholder={r.username_placeholder}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1E3080] focus:border-transparent transition"
              autoComplete="username"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {r.email_label}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={(e) => handleBlur("email", e.target.value)}
              placeholder={r.email_placeholder}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1E3080] focus:border-transparent transition"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {r.password_label}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => handleChange("password", e.target.value)}
              onBlur={(e) => handleBlur("password", e.target.value)}
              placeholder={r.password_placeholder}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1E3080] focus:border-transparent transition"
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {r.confirmPassword_label}
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              onBlur={(e) => handleBlur("confirmPassword", e.target.value)}
              placeholder={r.confirmPassword_placeholder}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1E3080] focus:border-transparent transition"
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#E8231A] hover:bg-[#C41C14] disabled:bg-[#f47c77] text-white font-bold py-3 rounded-xl transition-colors text-sm mt-2"
          >
            {isLoading ? r.loading : r.submit}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          {r.already_account}{" "}
          <Link href={ROUTES.LOGIN} className="text-[#1E3080] font-semibold hover:underline">
            {r.login_link}
          </Link>
        </p>
      </div>
    </div>
  );
}
