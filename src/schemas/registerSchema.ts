import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3, "Le nom d'utilisateur doit comporter au moins 3 caractères"),
  email: z.string().email("L'adresse email est invalide"),
  password: z.string().min(6, "Le mot de passe doit comporter au moins 6 caractères"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
