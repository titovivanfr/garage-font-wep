import type { AuthSession, LoginCredentials } from "~/types/auth";
import type { Ref, ComputedRef } from "vue";
import { ref, computed } from "vue";
import { AuthStatus } from "~/enums/authStatus";

interface UseAuthReturn {
  session: Ref<AuthSession | null>;
  isAuthenticated: ComputedRef<boolean>;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const session = ref<AuthSession | null>(null);
  const isAuthenticated = computed(() => session.value !== null);
  const headers = {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const status = useState<AuthStatus>("auth-status", () => AuthStatus.Loading);
  const fetchUser = async (): Promise<void> => {
    const requestHeaders = import.meta.server
      ? useRequestHeaders(["cookie"])
      : {};
    try {
      status.value = AuthStatus.Loading;
      session.value = await $fetch<AuthSession>("/api/auth/user", {
        method: "GET",
        credentials: "include",
        headers: {
          ...headers,
          ...requestHeaders,
        },
      });
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
      session.value = await $fetch<AuthSession>("/api/auth/login", {
        method: "POST",
        headers,
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

  return {
    session,
    isAuthenticated,
    login,
    logout,
    fetchUser,
  };
}
