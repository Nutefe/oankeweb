"use client";
import { createContext, useCallback, useContext, useState } from "react";
import { CardFormValues, MobileMoneyFormValues, PayPalFormValues } from "@/schemas/paymentSchema";
import { TypeAbonnements } from "@/types/type-abonnement";
import { number } from "zod";

export type PaymentMethod = "card" | "mobile_money" | "paypal";

export interface SubscriptionDraft {
  offer: TypeAbonnements | null;
  categorieCommerce: number;
  paymentMethod: PaymentMethod;
  cardData: Partial<CardFormValues>;
  mobileMoneyData: Partial<MobileMoneyFormValues>;
  paypalData: Partial<PayPalFormValues>;
}

interface SubscriptionContextValue {
  draft: SubscriptionDraft;
  setOffer: (offer: TypeAbonnements) => void;
  setCategorieCommerce: (categorieCommerce: number) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setCardData: (data: Partial<CardFormValues>) => void;
  setMobileMoneyData: (data: Partial<MobileMoneyFormValues>) => void;
  setPaypalData: (data: Partial<PayPalFormValues>) => void;
  resetDraft: () => void;
}

const defaultDraft: SubscriptionDraft = {
  offer: null,
  categorieCommerce: 0,
  paymentMethod: "card",
  cardData: {},
  mobileMoneyData: {},
  paypalData: {},
};

const SubscriptionContext = createContext<SubscriptionContextValue>({
  draft: defaultDraft,
  setOffer: () => {},
  setCategorieCommerce: () => {},
  setPaymentMethod: () => {},
  setCardData: () => {},
  setMobileMoneyData: () => {},
  setPaypalData: () => {},
  resetDraft: () => {},
});

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraft] = useState<SubscriptionDraft>(defaultDraft);

  const setOffer = useCallback((offer: TypeAbonnements) => {
    setDraft((prev) => ({ ...prev, offer }));
  }, []);

  const setCategorieCommerce = useCallback((categorieCommerce: number) => {
    setDraft((prev) => ({ ...prev, categorieCommerce }));
  }, []);

  const setPaymentMethod = useCallback((paymentMethod: PaymentMethod) => {
    setDraft((prev) => ({ ...prev, paymentMethod }));
  }, []);

  const setCardData = useCallback((cardData: Partial<CardFormValues>) => {
    setDraft((prev) => ({ ...prev, cardData: { ...prev.cardData, ...cardData } }));
  }, []);

  const setMobileMoneyData = useCallback((data: Partial<MobileMoneyFormValues>) => {
    setDraft((prev) => ({ ...prev, mobileMoneyData: { ...prev.mobileMoneyData, ...data } }));
  }, []);

  const setPaypalData = useCallback((data: Partial<PayPalFormValues>) => {
    setDraft((prev) => ({ ...prev, paypalData: { ...prev.paypalData, ...data } }));
  }, []);

  const resetDraft = useCallback(() => {
    setDraft(defaultDraft);
  }, []);

  return (
    <SubscriptionContext.Provider
      value={{ draft, setOffer, setCategorieCommerce, setPaymentMethod, setCardData, setMobileMoneyData, setPaypalData, resetDraft }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  return useContext(SubscriptionContext);
}
