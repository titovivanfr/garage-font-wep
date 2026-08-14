import type { AuthSession, LoginCredentials } from "~/types/auth";

const session = ref<AuthSession | null>(null);

export function useAuth() {
  const isAuthenticated = computed(() => session.value !== null);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      session.value = await $fetch<AuthSession>("/api/auth/login", {
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
      throw new Error(body?.message ?? "E-mail ou mot de passe invalide.", {
        cause: error,
      });
    }
  };

  const logout = async (): Promise<void> => {
    await $fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    session.value = null;
  };

  return { session, isAuthenticated, login, logout };
}
