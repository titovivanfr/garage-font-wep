import type { AuthSession, LoginCredentials } from "~/DTOs/auth/AuthDtos";
interface AuthService {
  login(credentials: LoginCredentials): Promise<AuthSession>;
}
async function apiLogin(
  credentials: LoginCredentials,
  baseUrl: string,
): Promise<AuthSession> {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });

  if (!response.ok) {
    const body: { message?: string } | null = await response
      .json()
      .catch(() => null);
    throw new Error(body?.message ?? "E-mail ou mot de passe invalide.");
  }
  return (await response.json()) as AuthSession;
}

export const authService: AuthService = {
  async login(credentials) {
    const apiBase = useRuntimeConfig().public.apiBase;
    return apiLogin(credentials, apiBase);
  },
};
