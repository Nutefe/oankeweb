export interface AuthResponse {
  token: string;
  type: string;
  username: string;
  email: string;
  roles: string;
  typeCommerce: string[];
}

export interface StoredUser {
  token: string;
  username: string;
  email: string;
  // roles: string;
  typeCommerce: string[];
}

export interface Users{
  token: string;
  username: string;
  email: string;
  roles: string;
  typeCommerce: string[];
}
