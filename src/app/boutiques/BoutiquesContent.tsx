"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/auth/authUtils";
import { ROUTES, DashboardSlug, getDashboardRoute } from "@/constants/routes";
import { useUser } from "@/hooks/useUser";
import { useLang } from "@/lib/LangContext";
import { createBoutique, getBoutiques } from "@/services/boutiqueService";
import { Boutique } from "@/types/boutique";

interface BoutiquesContentProps {
  initialCategorieCommerce: number | null;
  initialDashboard: DashboardSlug | null;
  initialBoutiques: Boutique[];
  initialError: string;
}

const INITIAL_FORM = {
  nom: "",
  adresse: "",
  telephone: "",
};

export default function BoutiquesContent({
  initialCategorieCommerce,
  initialDashboard,
  initialBoutiques,
  initialError,
}: BoutiquesContentProps) {
  const { t } = useLang();
  const { user } = useUser();
  const router = useRouter();
  const choose = t.choose;

  const [boutiques, setBoutiques] = useState<Boutique[]>(initialBoutiques);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(initialError);
  const [formData, setFormData] = useState(INITIAL_FORM);

  const token = user?.token ?? getUser()?.token;

  const commerceLabel = useMemo(() => {
    if (initialDashboard === "restaurant") return choose.restaurant;
    if (initialDashboard === "service") return choose.service;
    return choose.vente;
  }, [choose.restaurant, choose.service, choose.vente, initialDashboard]);

  async function refreshBoutiques() {
    if (!token || !initialCategorieCommerce) return;

    setIsLoading(true);

    try {
      const data = await getBoutiques(token, initialCategorieCommerce);
      setBoutiques(data);
      setError("");
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : choose.boutiques_error,
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateBoutique(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!token || !initialCategorieCommerce) {
      setError(choose.boutiques_error);
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await createBoutique(
        {
          categorieCommerce: initialCategorieCommerce,
          nom: formData.nom.trim(),
          adresse: formData.adresse.trim(),
          telephone: formData.telephone.trim(),
        },
        token,
      );
      setFormData(INITIAL_FORM);
      await refreshBoutiques();
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : choose.boutiques_create_error,
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function openBoutique(boutique: Boutique) {
    if (!initialDashboard) return;

    const dashboardRoute = getDashboardRoute(initialDashboard);
    router.push(`${dashboardRoute}?boutique=${boutique.id}`);
  }

  if (!initialCategorieCommerce || !initialDashboard) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow p-8 text-center border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            {choose.boutiques_invalid}
          </h1>
          <button
            type="button"
            onClick={() => router.push(ROUTES.CHOOSE_COMMERCE)}
            className="inline-flex items-center justify-center rounded-xl bg-[#1E3080] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#162260]"
          >
            {choose.boutiques_back}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
            {choose.boutiques_title}
          </h1>
          <p className="mx-auto max-w-2xl text-gray-500">
            {choose.boutiques_subtitle.replace("{commerce}", commerceLabel)}
          </p>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#1E3080] border-t-transparent" />
          </div>
        ) : boutiques.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {boutiques.map((boutique) => (
              <button
                key={boutique.id}
                type="button"
                onClick={() => openBoutique(boutique)}
                className="flex flex-col items-start gap-4 rounded-2xl border-2 border-gray-100 bg-white p-6 text-left shadow transition-all hover:border-blue-700 hover:shadow-md"
              >
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {boutique.nom}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {boutique.adresse || choose.boutiques_address_missing}
                  </p>
                </div>
                <p className="text-sm font-medium text-blue-700">
                  {boutique.telephone || choose.boutiques_phone_missing}
                </p>
              </button>
            ))}
          </div>
        ) : (
          <div className="mx-auto w-full max-w-2xl rounded-3xl border border-dashed border-gray-300 bg-white p-8 shadow-sm">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {choose.boutiques_empty_title}
              </h2>
              <p className="text-gray-500">{choose.boutiques_empty_subtitle}</p>
            </div>

            <form className="grid grid-cols-1 gap-5" onSubmit={handleCreateBoutique}>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {choose.boutiques_name_label}
                </label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(event) =>
                    setFormData((prev) => ({ ...prev, nom: event.target.value }))
                  }
                  placeholder={choose.boutiques_name_placeholder}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#1E3080]"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {choose.boutiques_address_label}
                </label>
                <input
                  type="text"
                  value={formData.adresse}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      adresse: event.target.value,
                    }))
                  }
                  placeholder={choose.boutiques_address_placeholder}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#1E3080]"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {choose.boutiques_phone_label}
                </label>
                <input
                  type="tel"
                  value={formData.telephone}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      telephone: event.target.value,
                    }))
                  }
                  placeholder={choose.boutiques_phone_placeholder}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#1E3080]"
                  required
                />
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-[#E8231A] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#C41C14] disabled:cursor-not-allowed disabled:bg-[#f47c77]"
                >
                  {isSubmitting
                    ? choose.boutiques_creating
                    : choose.boutiques_create}
                </button>
                <button
                  type="button"
                  onClick={() => router.push(ROUTES.CHOOSE_COMMERCE)}
                  className="inline-flex w-full items-center justify-center rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                >
                  {choose.boutiques_back}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
