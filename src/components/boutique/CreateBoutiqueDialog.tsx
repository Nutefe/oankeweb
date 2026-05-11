"use client";

import { useState } from "react";
import { useLang } from "@/lib/LangContext";
import {
  DEFAULT_BOUTIQUE_REQUEST_ERROR,
  createBoutique,
} from "@/services/boutiqueService";
import { createBoutiqueSchema } from "@/schemas/boutiqueSchema";

interface CreateBoutiqueDialogProps {
  isOpen: boolean;
  onClose: () => void;
  categorieCommerce: number;
  token: string;
  onSuccess: () => void;
}

const INITIAL_FORM = {
  nom: "",
  adresse: "",
  telephone: "",
};

export default function CreateBoutiqueDialog({
  isOpen,
  onClose,
  categorieCommerce,
  token,
  onSuccess,
}: CreateBoutiqueDialogProps) {
  const { t } = useLang();
  const choose = t.choose;

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleCreateBoutique(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    // Valider avec Zod
    const result = createBoutiqueSchema.safeParse(formData);

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        errors[path] = issue.message;
      });
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      await createBoutique(
        {
          categorieCommerce,
          nom: result.data.nom,
          adresse: result.data.adresse,
          telephone: result.data.telephone,
        },
        token,
      );
      setFormData(INITIAL_FORM);
      onSuccess();
      onClose();
    } catch (err) {
      setError(
        err instanceof Error &&
          err.message !== "" &&
          err.message !== DEFAULT_BOUTIQUE_REQUEST_ERROR
          ? err.message
          : choose.boutiques_create_error,
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-lg">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              {choose.boutiques_create}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 transition hover:text-gray-600"
              aria-label="Close dialog"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleCreateBoutique} className="space-y-4">
            {/* Nom */}
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
                className={`w-full rounded-lg border px-4 py-2 text-sm outline-none transition ${
                  fieldErrors.nom
                    ? "border-red-300 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 focus:border-transparent focus:ring-2 focus:ring-[#1E3080]"
                }`}
                required
              />
              {fieldErrors.nom && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.nom}</p>
              )}
            </div>

            {/* Adresse */}
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
                className={`w-full rounded-lg border px-4 py-2 text-sm outline-none transition ${
                  fieldErrors.adresse
                    ? "border-red-300 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 focus:border-transparent focus:ring-2 focus:ring-[#1E3080]"
                }`}
                required
              />
              {fieldErrors.adresse && (
                <p className="mt-1 text-xs text-red-600">
                  {fieldErrors.adresse}
                </p>
              )}
            </div>

            {/* Téléphone */}
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
                className={`w-full rounded-lg border px-4 py-2 text-sm outline-none transition ${
                  fieldErrors.telephone
                    ? "border-red-300 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 focus:border-transparent focus:ring-2 focus:ring-[#1E3080]"
                }`}
                required
              />
              {fieldErrors.telephone && (
                <p className="mt-1 text-xs text-red-600">
                  {fieldErrors.telephone}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-lg bg-[#E8231A] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#C41C14] disabled:cursor-not-allowed disabled:bg-[#f47c77]"
              >
                {isSubmitting
                  ? choose.boutiques_creating
                  : choose.boutiques_create}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex w-full items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
              >
                {choose.boutiques_back}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
