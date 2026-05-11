import { z } from "zod";

export const createBoutiqueSchema = z.object({
  nom: z
    .string()
    .min(1, "Le nom de la boutique est requis")
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom ne peut pas dépasser 100 caractères")
    .trim(),
  adresse: z
    .string()
    .min(1, "L'adresse est requise")
    .min(5, "L'adresse doit contenir au moins 5 caractères")
    .max(255, "L'adresse ne peut pas dépasser 255 caractères")
    .trim(),
  telephone: z
    .string()
    .min(1, "Le téléphone est requis")
    .min(8, "Le numéro de téléphone doit contenir au moins 8 caractères")
    .max(20, "Le numéro de téléphone ne peut pas dépasser 20 caractères")
    .trim(),
});

export type CreateBoutiqueFormData = z.infer<typeof createBoutiqueSchema>;
