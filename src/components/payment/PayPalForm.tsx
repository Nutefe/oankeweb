"use client";
import { useMemo, useState } from "react";
import { useLang } from "@/lib/LangContext";
import { useSubscription } from "@/lib/SubscriptionContext";
import { createPayPalSchema, PayPalFormValues } from "@/schemas/paymentSchema";

interface PayPalFormProps {
  onSubmit: (data: PayPalFormValues) => void;
  isSubmitting: boolean;
}

export default function PayPalForm({ onSubmit, isSubmitting }: PayPalFormProps) {
  const { t } = useLang();
  const s = t.subscribe;
  const p = s.paypal;
  const { draft, setPaypalData } = useSubscription();

  const [email, setEmail] = useState(draft.paypalData.paypalEmail ?? "");
  const [error, setError] = useState<string | undefined>();
  const [touched, setTouched] = useState(false);

  const schema = useMemo(
    () => createPayPalSchema({ email_invalid: p.validation.email_invalid }),
    [p]
  );

  function validate(value: string) {
    const result = schema.safeParse({ paypalEmail: value });
    if (!result.success) {
      const fe = result.error.flatten().fieldErrors;
      setError(fe.paypalEmail?.[0]);
    } else {
      setError(undefined);
    }
  }

  function handleChange(value: string) {
    setEmail(value);
    setPaypalData({ paypalEmail: value });
    if (touched) validate(value);
  }

  function handleBlur() {
    setTouched(true);
    validate(email);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    const result = schema.safeParse({ paypalEmail: email });
    if (!result.success) {
      const fe = result.error.flatten().fieldErrors;
      setError(fe.paypalEmail?.[0]);
      return;
    }
    onSubmit(result.data as PayPalFormValues);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{p.email_label}</label>
        <input
          type="email"
          value={email}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          placeholder={p.email_placeholder}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1E3080] focus:border-transparent transition"
          autoComplete="email"
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#1877F2] hover:bg-[#0d6cdc] disabled:bg-[#90b8f5] text-white font-bold py-3 rounded-xl transition-colors text-sm mt-2 flex items-center justify-center gap-2"
      >
        {/* PayPal-style P icon */}
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 00-.607-.541c1.379 1.883 1.39 4.485.16 7.236-.962 2.166-2.606 3.952-4.792 5.07a11.29 11.29 0 01-4.993 1.154H8.171l-.186 1.18a.641.641 0 00.634.739h4.358c.524 0 .968-.382 1.05-.9l.044-.273.847-5.378.054-.294c.082-.517.527-.9 1.05-.9h.663c4.298 0 7.664-1.747 8.647-6.797.413-2.118.2-3.885-.91-5.296z" />
        </svg>
        {isSubmitting ? s.submitting : p.cta}
      </button>
    </form>
  );
}
