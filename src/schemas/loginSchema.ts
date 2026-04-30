import { z } from "zod";

export interface LoginSchemaMessages {
  username_required: string;
  password_required: string;
}

export function createLoginSchema(messages: LoginSchemaMessages) {
  return z.object({
    username: z.string().min(1, messages.username_required),
    password: z.string().min(1, messages.password_required),
  });
}

export type LoginFormValues = {
  username: string;
  password: string;
};
