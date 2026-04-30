import { z } from "zod";

export interface RegisterSchemaMessages {
  username_min: string;
  email_invalid: string;
  password_min: string;
}

export function createRegisterSchema(messages: RegisterSchemaMessages) {
  return z.object({
    username: z.string().min(3, messages.username_min),
    email: z.string().email(messages.email_invalid),
    password: z.string().min(6, messages.password_min),
  });
}

export type RegisterFormValues = {
  username: string;
  email: string;
  password: string;
};
