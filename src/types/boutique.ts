export interface Boutique {
  id: number;
  categorieCommerce?: number;
  nom: string;
  adresse: string;
  telephone: string;
}

export interface CreateBoutiquePayload {
  categorieCommerce: number;
  nom: string;
  adresse: string;
  telephone: string;
}
