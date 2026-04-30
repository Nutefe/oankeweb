"use client";
import { useMemo, useState } from "react";
import { useLang } from "@/lib/LangContext";
import { useSubscription } from "@/lib/SubscriptionContext";
import { createMobileMoneySchema, MobileMoneyFormValues } from "@/schemas/paymentSchema";

interface MobileMoneyFormProps {
  onSubmit: (data: MobileMoneyFormValues) => void;
  isSubmitting: boolean;
}

type MoMoField = "provider" | "phoneNumber" | "accountName";
type MoMoErrors = Partial<Record<MoMoField, string>>;
type MoMoTouched = Partial<Record<MoMoField, boolean>>;

const PROVIDERS = ["MTN", "ORANGE", "MOOV"] as const;

export default function MobileMoneyForm({ onSubmit, isSubmitting }: MobileMoneyFormProps) {
  const { t } = useLang();
  const s = t.subscribe;
  const m = s.mobile_money;
  const { draft, setMobileMoneyData } = useSubscription();

  const savedProvider = draft.mobileMoneyData.provider;

  const [provider, setProvider] = useState<string>(
    savedProvider && PROVIDERS.includes(savedProvider as (typeof PROVIDERS)[number]) ? savedProvider : ""
  );
  const [phone, setPhone] = useState(draft.mobileMoneyData.phoneNumber ?? "");
  const [accountName, setAccountName] = useState(draft.mobileMoneyData.accountName ?? "");
  const [otp, setOtp] = useState(draft.mobileMoneyData.otp ?? "");
  const [showOtp, setShowOtp] = useState(false);
  const [errors, setErrors] = useState<MoMoErrors>({});
  const [touched, setTouched] = useState<MoMoTouched>({});

  const schema = useMemo(
    () =>
      createMobileMoneySchema({
        provider_invalid: m.validation.provider_invalid,
        phone_invalid: m.validation.phone_invalid,
        account_min: m.validation.account_min,
      }),
    [m]
  );

  function getValues(): Partial<MobileMoneyFormValues> {
    return {
      provider: PROVIDERS.includes(provider as (typeof PROVIDERS)[number])
        ? (provider as (typeof PROVIDERS)[number])
        : undefined,
      phoneNumber: phone,
      accountName,
      otp: otp || undefined,
    };
  }

  function validateField(field: MoMoField, overrideValues?: Record<string, unknown>) {
    const values = { ...getValues(), ...(overrideValues ?? {}) };
    const result = schema.safeParse(values);
    if (!result.success) {
      const fe = result.error.flatten().fieldErrors;
      setErrors((prev) => ({ ...prev, [field]: fe[field as keyof typeof fe]?.[0] }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleBlur(field: MoMoField) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field);
  }

  function handleChange(field: MoMoField, value: string) {
    if (field === "provider") setProvider(value);
    else if (field === "phoneNumber") setPhone(value);
    else if (field === "accountName") setAccountName(value);
    setMobileMoneyData({ [field]: value } as Partial<MobileMoneyFormValues>);
    if (touched[field]) validateField(field, { [field]: value });
  }

  function handleOtpChange(value: string) {
    setOtp(value);
    setMobileMoneyData({ ...getValues(), otp: value || undefined });
  }

  function handleSendOtp(e: React.MouseEvent) {
    e.preventDefault();
    setShowOtp(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ provider: true, phoneNumber: true, accountName: true });
    const result = schema.safeParse(getValues());
    if (!result.success) {
      const fe = result.error.flatten().fieldErrors;
      setErrors({
        provider: fe.provider?.[0],
        phoneNumber: fe.phoneNumber?.[0],
        accountName: fe.accountName?.[0],
      });
      return;
    }
    onSubmit(result.data as MobileMoneyFormValues);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {/* Provider */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{m.provider_label}</label>
        <select
          value={provider}
          onChange={(e) => handleChange("provider", e.target.value)}
          onBlur={() => handleBlur("provider")}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1E3080] focus:border-transparent transition bg-white"
        >
          <option value="">—</option>
          {PROVIDERS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        {errors.provider && <p className="text-red-500 text-xs mt-1">{errors.provider}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{m.phone_label}</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
          onBlur={() => handleBlur("phoneNumber")}
          placeholder={m.phone_placeholder}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1E3080] focus:border-transparent transition"
          autoComplete="tel"
        />
        {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
      </div>

      {/* Account name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{m.account_label}</label>
        <input
          type="text"
          value={accountName}
          onChange={(e) => handleChange("accountName", e.target.value)}
          onBlur={() => handleBlur("accountName")}
          placeholder={m.account_placeholder}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1E3080] focus:border-transparent transition"
        />
        {errors.accountName && <p className="text-red-500 text-xs mt-1">{errors.accountName}</p>}
      </div>

      {/* OTP (shown only after "Send OTP" clicked) */}
      {showOtp ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{m.otp_label}</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => handleOtpChange(e.target.value)}
            placeholder={m.otp_placeholder}
            maxLength={8}
            inputMode="numeric"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1E3080] focus:border-transparent transition"
          />
        </div>
      ) : (
        <button
          onClick={handleSendOtp}
          className="self-start text-sm text-[#1E3080] font-semibold underline hover:text-[#162260] transition-colors"
        >
          {m.send_otp}
        </button>
      )}

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
