export interface LoginFormValues {
  username: string;
  password: string;
}

export function validateLoginForm(
  values: LoginFormValues
): Partial<Record<keyof LoginFormValues, string>> {
  const errors: Partial<Record<keyof LoginFormValues, string>> = {};
  if (!values.username.trim()) errors.username = "Le nom d'utilisateur est requis";
  if (!values.password) errors.password = "Le mot de passe est requis";
  return errors;
}
