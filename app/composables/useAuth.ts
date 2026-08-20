import type { AuthSession, LoginCredentials } from "~/types/auth";
import { AuthStatus } from "~/enums/authStatus";
import { useState } from "#app";
interface UseAuthReturn {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const session = useState<AuthSession | null>("auth-session", () => null);
  const headers = {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const status = useState<AuthStatus>("auth-status", () => AuthStatus.Loading);
  const fetchUser = async (): Promise<void> => {
    try {
      status.value = AuthStatus.Loading;
      const data = await $fetch<AuthSession>("/api/auth/user", {
        method: "GET",
        credentials: "include",
        headers,
      });
      if (data) {
        data.logout = logout;
      }
      session.value = data;
      if (session.value) {
        status.value = AuthStatus.Authenticated;
      } else {
        status.value = AuthStatus.Unauthenticated;
      }
      console.log("Fetched user:", session.value);
      console.log("Statuis:", status.value);
    } catch (error: unknown) {
      const response = (error as { response?: { status?: number } } | null)
        ?.response;
      console.log("Error fetching user:", response?.status, error);
      if (response?.status === 401) {
        session.value = null;
        status.value = AuthStatus.Unauthenticated;
      } else {
        session.value = null;
        status.value = AuthStatus.Unauthenticated;
      }
    }
  };

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      const req = await $fetch<AuthSession>("/api/auth/login", {
        method: "POST",
        headers,
        body: credentials,
        credentials: "include",
      });
      req.logout = logout;
      session.value = req;
      console.log("Logged in login in user:", session.value);
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
  return {
    login,
    logout,
    fetchUser,
  };
}
