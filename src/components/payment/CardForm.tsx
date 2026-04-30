"use client";
import { useMemo, useState } from "react";
import { useLang } from "@/lib/LangContext";
import { useSubscription } from "@/lib/SubscriptionContext";
import { createCardSchema, CardFormValues } from "@/schemas/paymentSchema";

interface CardFormProps {
  onSubmit: (data: CardFormValues) => void;
  isSubmitting: boolean;
}

type CardField = "cardHolderName" | "cardNumber" | "expiry" | "cvc";
type CardErrors = Partial<Record<CardField, string>>;
type CardTouched = Partial<Record<CardField, boolean>>;

export default function CardForm({ onSubmit, isSubmitting }: CardFormProps) {
  const { t } = useLang();
  const s = t.subscribe;
  const c = s.card;
  const { draft, setCardData } = useSubscription();

  const [holderName, setHolderName] = useState(draft.cardData.cardHolderName ?? "");
  const [number, setNumber] = useState(draft.cardData.cardNumber ?? "");
  const [expiry, setExpiry] = useState(draft.cardData.expiry ?? "");
  const [cvc, setCvc] = useState(draft.cardData.cvc ?? "");
  const [saveCard, setSaveCard] = useState(draft.cardData.saveCard ?? false);
  const [errors, setErrors] = useState<CardErrors>({});
  const [touched, setTouched] = useState<CardTouched>({});

  const schema = useMemo(
    () =>
      createCardSchema({
        holder_min: c.validation.holder_min,
        number_invalid: c.validation.number_invalid,
        expiry_invalid: c.validation.expiry_invalid,
        cvc_invalid: c.validation.cvc_invalid,
      }),
    [c]
  );

  function getValues() {
    return { cardHolderName: holderName, cardNumber: number, expiry, cvc, saveCard };
  }

  function validateField(field: CardField, overrideValues?: Record<string, unknown>) {
    const values = { ...getValues(), ...(overrideValues ?? {}) };
    const result = schema.safeParse(values);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field as keyof typeof fieldErrors]?.[0] }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleBlur(field: CardField) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field);
  }

  function handleChange(field: CardField, value: string) {
    if (field === "cardHolderName") setHolderName(value);
    else if (field === "cardNumber") setNumber(value);
    else if (field === "expiry") setExpiry(value);
    else if (field === "cvc") setCvc(value);
    setCardData({ [field]: value } as Partial<CardFormValues>);
    if (touched[field]) validateField(field, { [field]: value });
  }

  function handleExpiryChange(value: string) {
    // Auto-insert slash after 2 digits
    let v = value.replace(/\D/g, "");
    if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2, 4);
    setExpiry(v);
    setCardData({ ...getValues(), expiry: v });
    if (touched.expiry) validateField("expiry", { expiry: v });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ cardHolderName: true, cardNumber: true, expiry: true, cvc: true });
    const result = schema.safeParse(getValues());
    if (!result.success) {
      const fe = result.error.flatten().fieldErrors;
      setErrors({
        cardHolderName: fe.cardHolderName?.[0],
        cardNumber: fe.cardNumber?.[0],
        expiry: fe.expiry?.[0],
        cvc: fe.cvc?.[0],
      });
      return;
    }
    onSubmit(result.data as CardFormValues);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {/* Cardholder name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{c.holder_label}</label>
        <input
          type="text"
          value={holderName}
          onChange={(e) => handleChange("cardHolderName", e.target.value)}
          onBlur={() => handleBlur("cardHolderName")}
          placeholder={c.holder_placeholder}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1E3080] focus:border-transparent transition"
          autoComplete="cc-name"
        />
        {errors.cardHolderName && <p className="text-red-500 text-xs mt-1">{errors.cardHolderName}</p>}
      </div>

      {/* Card number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{c.number_label}</label>
        <input
          type="text"
          value={number}
          onChange={(e) => handleChange("cardNumber", e.target.value)}
          onBlur={() => handleBlur("cardNumber")}
          placeholder={c.number_placeholder}
          maxLength={19}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1E3080] focus:border-transparent transition"
          autoComplete="cc-number"
          inputMode="numeric"
        />
        {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
      </div>

      {/* Expiry + CVC */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">{c.expiry_label}</label>
          <input
            type="text"
            value={expiry}
            onChange={(e) => handleExpiryChange(e.target.value)}
            onBlur={() => handleBlur("expiry")}
            placeholder={c.expiry_placeholder}
            maxLength={5}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1E3080] focus:border-transparent transition"
            autoComplete="cc-exp"
            inputMode="numeric"
          />
          {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
        </div>
        <div className="w-28">
          <label className="block text-sm font-medium text-gray-700 mb-1">{c.cvc_label}</label>
          <input
            type="text"
            value={cvc}
            onChange={(e) => handleChange("cvc", e.target.value)}
            onBlur={() => handleBlur("cvc")}
            placeholder={c.cvc_placeholder}
            maxLength={4}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1E3080] focus:border-transparent transition"
            autoComplete="cc-csc"
            inputMode="numeric"
          />
          {errors.cvc && <p className="text-red-500 text-xs mt-1">{errors.cvc}</p>}
        </div>
      </div>

      {/* Save card */}
      <label className="flex items-center gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={saveCard}
          onChange={(e) => {
            setSaveCard(e.target.checked);
            setCardData({ ...getValues(), saveCard: e.target.checked });
          }}
          className="w-4 h-4 rounded border-gray-300 text-[#1E3080] focus:ring-[#1E3080]"
        />
        <span className="text-sm text-gray-700">{c.save_card}</span>
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#E8231A] hover:bg-[#C41C14] disabled:bg-[#f47c77] text-white font-bold py-3 rounded-xl transition-colors text-sm mt-2"
      >
        {isSubmitting ? t.subscribe.submitting : t.subscribe.submit}
      </button>
    </form>
  );
}
