"use client";
import { useState } from "react";
import { useLang } from "@/lib/LangContext";
import { useUser } from "@/hooks/useUser";
import { useSubscription, PaymentMethod } from "@/lib/SubscriptionContext";
import CardForm from "@/components/payment/CardForm";
import MobileMoneyForm from "@/components/payment/MobileMoneyForm";
import PayPalForm from "@/components/payment/PayPalForm";
import AuthGateModal from "@/components/payment/AuthGateModal";
import { CardFormValues, MobileMoneyFormValues, PayPalFormValues } from "@/schemas/paymentSchema";
import { saveAbonnement } from "@/services/abonnementService";
import { getUser } from "@/auth/authUtils";

interface PaymentTabsProps {
  onSuccess: () => void;
}

const TABS: { key: PaymentMethod; labelKey: "tab_card" | "tab_mobile_money" | "tab_paypal" }[] = [
  { key: "card", labelKey: "tab_card" },
  { key: "mobile_money", labelKey: "tab_mobile_money" },
  { key: "paypal", labelKey: "tab_paypal" },
];

export default function PaymentTabs({ onSuccess }: PaymentTabsProps) {
  const { t } = useLang();
  const s = t.subscribe;
  const { user } = useUser();
  const { draft, setPaymentMethod } = useSubscription();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAuthGate, setShowAuthGate] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState<
    | { method: "card"; data: CardFormValues }
    | { method: "mobile_money"; data: MobileMoneyFormValues }
    | { method: "paypal"; data: PayPalFormValues }
    | null
  >(null);

  async function processPayment(
    payload:
      | { method: "card"; data: CardFormValues }
      | { method: "mobile_money"; data: MobileMoneyFormValues }
      | { method: "paypal"; data: PayPalFormValues }
  ) {
    setIsSubmitting(true);
    try {
      const token = user?.token ?? getUser()?.token;
      await saveAbonnement({
        categorieCommerce: draft.categorieCommerce,
        typeAbonnement: draft.offer?.id ?? 1,
      }, token);
      console.info("Subscription validated:", { offer: draft.offer, ...payload });
      onSuccess();
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleFormSubmit(
    payload:
      | { method: "card"; data: CardFormValues }
      | { method: "mobile_money"; data: MobileMoneyFormValues }
      | { method: "paypal"; data: PayPalFormValues }
  ) {
    if (!user) {
      setPendingSubmit(payload);
      setShowAuthGate(true);
      return;
    }
    void processPayment(payload);
  }

  function handleAuthSuccess() {
    setShowAuthGate(false);
    if (pendingSubmit) {
      void processPayment(pendingSubmit);
      setPendingSubmit(null);
    }
  }

  return (
    <>
      {/* Tab bar */}
      <div className="flex border-b border-gray-200 mb-6">
        {TABS.map(({ key, labelKey }) => (
          <button
            key={key}
            onClick={() => setPaymentMethod(key)}
            className={`pb-3 px-4 mr-2 text-sm font-semibold border-b-2 transition-colors ${
              draft.paymentMethod === key
                ? "border-[#1E3080] text-[#1E3080]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {s[labelKey]}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {draft.paymentMethod === "card" && (
        <CardForm
          onSubmit={(data) => handleFormSubmit({ method: "card", data })}
          isSubmitting={isSubmitting}
        />
      )}
      {draft.paymentMethod === "mobile_money" && (
        <MobileMoneyForm
          onSubmit={(data) => handleFormSubmit({ method: "mobile_money", data })}
          isSubmitting={isSubmitting}
        />
      )}
      {draft.paymentMethod === "paypal" && (
        <PayPalForm
          onSubmit={(data) => handleFormSubmit({ method: "paypal", data })}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Auth gate modal */}
      {showAuthGate && (
        <AuthGateModal
          onSuccess={handleAuthSuccess}
          onClose={() => setShowAuthGate(false)}
        />
      )}
    </>
  );
}
