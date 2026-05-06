"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useLang } from "@/lib/LangContext";
import { useUser } from "@/hooks/useUser";
import { login, register } from "@/services/authService";
import { saveUser } from "@/auth/authUtils";
import { createLoginSchema } from "@/schemas/loginSchema";
import { createRegisterSchema } from "@/schemas/registerSchema";

interface AuthGateModalProps {
  onSuccess: () => void;
  onClose: () => void;
}

type AuthTab = "login" | "register";

export default function AuthGateModal({ onSuccess, onClose }: AuthGateModalProps) {
  const { t } = useLang();
  const s = t.subscribe.auth_gate;
  const l = t.login;
  const r = t.register;
  const { setUser } = useUser();
  const [activeTab, setActiveTab] = useState<AuthTab>("login");
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) onClose();
  }

  // ── Login form state ─────────────────────────────────────────────────────
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState<{ username?: string; password?: string }>({});
  const [loginTouched, setLoginTouched] = useState<{ username?: boolean; password?: boolean }>({});
  const [loginServerError, setLoginServerError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const loginSchema = useMemo(
    () =>
      createLoginSchema({
        username_required: l.validation.username_required,
        password_required: l.validation.password_required,
        password_min: l.validation.password_min,
      }),
    [l]
  );

  async function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoginServerError("");
    const result = loginSchema.safeParse({ username: loginUsername, password: loginPassword });
    if (!result.success) {
      const fe = result.error.flatten().fieldErrors;
      setLoginErrors({ username: fe.username?.[0], password: fe.password?.[0] });
      setLoginTouched({ username: true, password: true });
      return;
    }
    setLoginLoading(true);
    try {
      const response = await login(result.data);
      const storedUser = {
        token: response.token,
        username: response.username,
        email: response.email,
        typeCommerce: response.typeCommerce,
      };
      saveUser(storedUser);
      setUser(storedUser);
      onSuccess();
    } catch (err) {
      setLoginServerError(err instanceof Error ? err.message : l.error_generic);
    } finally {
      setLoginLoading(false);
    }
  }

  // ── Register form state ──────────────────────────────────────────────────
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [regErrors, setRegErrors] = useState<{
    username?: string; email?: string; password?: string; confirmPassword?: string;
  }>({});
  const [regTouched, setRegTouched] = useState<{
    username?: boolean; email?: boolean; password?: boolean; confirmPassword?: boolean;
  }>({});
  const [regServerError, setRegServerError] = useState("");
  const [regSuccess, setRegSuccess] = useState("");
  const [regLoading, setRegLoading] = useState(false);

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

  async function handleRegisterSubmit(e: React.FormEvent) {
    e.preventDefault();
    setRegServerError("");
    setRegSuccess("");
    const result = registerSchema.safeParse({
      username: regUsername, email: regEmail, password: regPassword, confirmPassword: regConfirm,
    });
    if (!result.success) {
      const fe = result.error.flatten().fieldErrors;
      setRegErrors({
        username: fe.username?.[0],
        email: fe.email?.[0],
        password: fe.password?.[0],
        confirmPassword: fe.confirmPassword?.[0],
      });
      setRegTouched({ username: true, email: true, password: true, confirmPassword: true });
      return;
    }
    setRegLoading(true);
    try {
      const { confirmPassword: _cp, ...registerData } = result.data;
      await register(registerData);
      setRegSuccess(s.register_success);
      // Auto-login after registration
      const loginResult = await login({ username: result.data.username, password: result.data.password });
      const storedUser = {
        token: loginResult.token,
        username: loginResult.username,
        email: loginResult.email,
        roles: loginResult.roles,
        typeCommerce: loginResult.typeCommerce,
      };
      saveUser(storedUser);
      setUser(storedUser);
      onSuccess();
    } catch (err) {
      setRegServerError(err instanceof Error ? err.message : r.error_generic);
    } finally {
      setRegLoading(false);
    }
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-label={s.title}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div
          className="px-6 pt-8 pb-4"
          style={{ background: "linear-gradient(135deg, var(--oanke-navy) 0%, var(--oanke-red) 100%)" }}
        >
          <div className="flex items-center justify-between">
            <Image src="/logo.png" alt="Oanke" width={110} height={40} className="h-9 w-auto" />
            <button
              onClick={onClose}
              aria-label="Fermer"
              className="text-white/70 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-white/80 text-sm mt-3">{s.title}</p>

          {/* Tabs */}
          <div className="flex mt-5 border-b border-white/20">
            {(["login", "register"] as AuthTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 mr-6 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-white text-white"
                    : "border-transparent text-white/60 hover:text-white"
                }`}
              >
                {tab === "login" ? s.tab_login : s.tab_register}
              </button>
            ))}
          </div>
        </div>

        {/* Form body */}
        <div className="px-6 py-6">
          {activeTab === "login" ? (
            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4" noValidate>
              {loginServerError && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                  {loginServerError}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{l.username_label}</label>
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => {
                    setLoginUsername(e.target.value);
                    if (loginTouched.username) {
                      const res = loginSchema.safeParse({ username: e.target.value, password: loginPassword });
                      setLoginErrors((prev) => ({
                        ...prev,
                        username: res.success ? undefined : res.error.flatten().fieldErrors.username?.[0],
                      }));
                    }
                  }}
                  onBlur={() => {
                    setLoginTouched((prev) => ({ ...prev, username: true }));
                    const res = loginSchema.safeParse({ username: loginUsername, password: loginPassword });
                    setLoginErrors((prev) => ({
                      ...prev,
                      username: res.success ? undefined : res.error.flatten().fieldErrors.username?.[0],
                    }));
                  }}
                  placeholder={l.username_placeholder}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1E3080] focus:border-transparent transition"
                  autoComplete="username"
                />
                {loginErrors.username && <p className="text-red-500 text-xs mt-1">{loginErrors.username}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{l.password_label}</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                    if (loginTouched.password) {
                      const res = loginSchema.safeParse({ username: loginUsername, password: e.target.value });
                      setLoginErrors((prev) => ({
                        ...prev,
                        password: res.success ? undefined : res.error.flatten().fieldErrors.password?.[0],
                      }));
                    }
                  }}
                  onBlur={() => {
                    setLoginTouched((prev) => ({ ...prev, password: true }));
                    const res = loginSchema.safeParse({ username: loginUsername, password: loginPassword });
                    setLoginErrors((prev) => ({
                      ...prev,
                      password: res.success ? undefined : res.error.flatten().fieldErrors.password?.[0],
                    }));
                  }}
                  placeholder={l.password_placeholder}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1E3080] focus:border-transparent transition"
                  autoComplete="current-password"
                />
                {loginErrors.password && <p className="text-red-500 text-xs mt-1">{loginErrors.password}</p>}
              </div>
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-[#E8231A] hover:bg-[#C41C14] disabled:bg-[#f47c77] text-white font-bold py-3 rounded-xl transition-colors text-sm mt-2"
              >
                {loginLoading ? s.login_loading : s.login_submit}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4" noValidate>
              {regServerError && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                  {regServerError}
                </div>
              )}
              {regSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm">
                  {regSuccess}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{r.username_label}</label>
                <input
                  type="text"
                  value={regUsername}
                  onChange={(e) => {
                    setRegUsername(e.target.value);
                    if (regTouched.username) {
                      const res = registerSchema.safeParse({ username: e.target.value, email: regEmail, password: regPassword, confirmPassword: regConfirm });
                      setRegErrors((prev) => ({ ...prev, username: res.success ? undefined : res.error.flatten().fieldErrors.username?.[0] }));
                    }
                  }}
                  onBlur={() => {
                    setRegTouched((prev) => ({ ...prev, username: true }));
                    const res = registerSchema.safeParse({ username: regUsername, email: regEmail, password: regPassword, confirmPassword: regConfirm });
                    setRegErrors((prev) => ({ ...prev, username: res.success ? undefined : res.error.flatten().fieldErrors.username?.[0] }));
                  }}
                  placeholder={r.username_placeholder}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1E3080] focus:border-transparent transition"
                  autoComplete="username"
                />
                {regErrors.username && <p className="text-red-500 text-xs mt-1">{regErrors.username}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{r.email_label}</label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => {
                    setRegEmail(e.target.value);
                    if (regTouched.email) {
                      const res = registerSchema.safeParse({ username: regUsername, email: e.target.value, password: regPassword, confirmPassword: regConfirm });
                      setRegErrors((prev) => ({ ...prev, email: res.success ? undefined : res.error.flatten().fieldErrors.email?.[0] }));
                    }
                  }}
                  onBlur={() => {
                    setRegTouched((prev) => ({ ...prev, email: true }));
                    const res = registerSchema.safeParse({ username: regUsername, email: regEmail, password: regPassword, confirmPassword: regConfirm });
                    setRegErrors((prev) => ({ ...prev, email: res.success ? undefined : res.error.flatten().fieldErrors.email?.[0] }));
                  }}
                  placeholder={r.email_placeholder}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1E3080] focus:border-transparent transition"
                  autoComplete="email"
                />
                {regErrors.email && <p className="text-red-500 text-xs mt-1">{regErrors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{r.password_label}</label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => {
                    setRegPassword(e.target.value);
                    if (regTouched.password) {
                      const res = registerSchema.safeParse({ username: regUsername, email: regEmail, password: e.target.value, confirmPassword: regConfirm });
                      setRegErrors((prev) => ({ ...prev, password: res.success ? undefined : res.error.flatten().fieldErrors.password?.[0] }));
                    }
                  }}
                  onBlur={() => {
                    setRegTouched((prev) => ({ ...prev, password: true }));
                    const res = registerSchema.safeParse({ username: regUsername, email: regEmail, password: regPassword, confirmPassword: regConfirm });
                    setRegErrors((prev) => ({ ...prev, password: res.success ? undefined : res.error.flatten().fieldErrors.password?.[0] }));
                  }}
                  placeholder={r.password_placeholder}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1E3080] focus:border-transparent transition"
                  autoComplete="new-password"
                />
                {regErrors.password && <p className="text-red-500 text-xs mt-1">{regErrors.password}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{r.confirmPassword_label}</label>
                <input
                  type="password"
                  value={regConfirm}
                  onChange={(e) => {
                    setRegConfirm(e.target.value);
                    if (regTouched.confirmPassword) {
                      const res = registerSchema.safeParse({ username: regUsername, email: regEmail, password: regPassword, confirmPassword: e.target.value });
                      setRegErrors((prev) => ({ ...prev, confirmPassword: res.success ? undefined : res.error.flatten().fieldErrors.confirmPassword?.[0] }));
                    }
                  }}
                  onBlur={() => {
                    setRegTouched((prev) => ({ ...prev, confirmPassword: true }));
                    const res = registerSchema.safeParse({ username: regUsername, email: regEmail, password: regPassword, confirmPassword: regConfirm });
                    setRegErrors((prev) => ({ ...prev, confirmPassword: res.success ? undefined : res.error.flatten().fieldErrors.confirmPassword?.[0] }));
                  }}
                  placeholder={r.confirmPassword_placeholder}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1E3080] focus:border-transparent transition"
                  autoComplete="new-password"
                />
                {regErrors.confirmPassword && <p className="text-red-500 text-xs mt-1">{regErrors.confirmPassword}</p>}
              </div>
              <button
                type="submit"
                disabled={regLoading}
                className="w-full bg-[#E8231A] hover:bg-[#C41C14] disabled:bg-[#f47c77] text-white font-bold py-3 rounded-xl transition-colors text-sm mt-2"
              >
                {regLoading ? s.register_loading : s.register_submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
