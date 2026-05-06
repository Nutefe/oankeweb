"use client";

import { CheckAbonnement } from "@/types/type-abonnement";

export function OffreAbonnementCell({ value }: { value: CheckAbonnement }) {
  if (value === "oui")
    return (
      <span className="font-semibold flex justify-center text-[var(--oanke-red)]">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </span>
    );
  if (value === "non")
    return (
      <span className="text-gray-400 flex justify-center">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </span>
    );
  return (
    <span className="block text-center text-sm text-gray-700">{value}</span>
  );
}
