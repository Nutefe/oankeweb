import { z } from "zod";

export interface RegisterSchemaMessages {
  username_required: string;
  username_min: string;
  email_required: string;
  email_invalid: string;
  password_min: string;
  confirmPassword_required: string;
  confirmPassword_mismatch: string;
}

export function createRegisterSchema(messages: RegisterSchemaMessages) {
  return z
    .object({
      username: z
        .string()
        .min(1, messages.username_required)
        .min(3, messages.username_min),
      email: z
        .string()
        .min(1, messages.email_required)
        .email(messages.email_invalid),
      password: z.string().min(6, messages.password_min),
      confirmPassword: z.string().min(1, messages.confirmPassword_required),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: messages.confirmPassword_mismatch,
      path: ["confirmPassword"],
    });
}

export type RegisterFormValues = z.infer<ReturnType<typeof createRegisterSchema>>;
