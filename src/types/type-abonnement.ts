export type CheckAbonnement = "oui" | "non" | string;
export interface TypeAbonnements {
  id: number;
  libelle: string;
  description: string;
  tarif: number;
  service: string;
  recommander: boolean;
}
