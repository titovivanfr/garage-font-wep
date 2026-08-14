import type { AuthSession, LoginCredentials } from "~/DTOs/auth/AuthDtos";
interface AuthService {
  login(credentials: LoginCredentials): Promise<AuthSession>;
}
async function apiLogin(credentials: LoginCredentials): Promise<AuthSession> {
  try {
    return await $fetch<AuthSession>("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: credentials,
      credentials: "include",
    });
  } catch (error) {
    const body = (error as { data?: { message?: string } })?.data;
    throw new Error(body?.message ?? "E-mail ou mot de passe invalide.");
  }
}

export const authService: AuthService = {
  login(credentials) {
    return apiLogin(credentials);
  },
};
