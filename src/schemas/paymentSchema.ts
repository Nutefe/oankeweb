import { z } from "zod";

// ── Card ─────────────────────────────────────────────────────────────────────

export interface CardSchemaMessages {
  holder_min: string;
  number_invalid: string;
  expiry_invalid: string;
  cvc_invalid: string;
}

export function createCardSchema(m: CardSchemaMessages) {
  return z.object({
    cardHolderName: z.string().min(2, m.holder_min),
    cardNumber: z
      .string()
      .transform((v) => v.replace(/\s+/g, ""))
      .pipe(z.string().regex(/^\d{16}$/, m.number_invalid)),
    expiry: z
      .string()
      .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, m.expiry_invalid),
    cvc: z.string().regex(/^\d{3,4}$/, m.cvc_invalid),
    saveCard: z.boolean().default(false),
  });
}

export type CardFormValues = z.infer<ReturnType<typeof createCardSchema>>;

// ── Mobile Money ─────────────────────────────────────────────────────────────

export interface MobileMoneySchemaMessages {
  provider_invalid: string;
  phone_invalid: string;
  account_min: string;
}

export function createMobileMoneySchema(m: MobileMoneySchemaMessages) {
  return z.object({
    provider: z.enum(["MTN", "ORANGE", "MOOV"], {
      error: m.provider_invalid,
    }),
    phoneNumber: z
      .string()
      .regex(/^\+?\d{8,15}$/, m.phone_invalid),
    accountName: z.string().min(2, m.account_min),
    otp: z.string().optional(),
  });
}

export type MobileMoneyFormValues = z.infer<
  ReturnType<typeof createMobileMoneySchema>
>;

// ── PayPal ───────────────────────────────────────────────────────────────────

export interface PayPalSchemaMessages {
  email_invalid: string;
}

export function createPayPalSchema(m: PayPalSchemaMessages) {
  return z.object({
    paypalEmail: z.string().email(m.email_invalid),
  });
}

export type PayPalFormValues = z.infer<ReturnType<typeof createPayPalSchema>>;
