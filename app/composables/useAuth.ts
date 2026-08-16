import type { AuthSession, LoginCredentials } from "~/types/auth";
import type { Ref, ComputedRef } from "vue";
import { ref, computed } from "vue";
import { AuthStatus } from "~/enums/authStatus";
const session = ref<AuthSession | null>(null);

interface UseAuthReturn {
  session: Ref<AuthSession | null>;
  isAuthenticated: ComputedRef<boolean>;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
  initialized: Ref<boolean>;
}

export function useAuth(): UseAuthReturn {
  const initialized = useState<boolean>("auth-initialized", () => false);
  const isAuthenticated = computed(() => session.value !== null);
  const headers = {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const status = useState<AuthStatus>("auth-status", () => AuthStatus.Loading);
  const fetchUser = async (): Promise<void> => {
    try {
      status.value = AuthStatus.Loading;
      session.value = await $fetch<AuthSession>("/api/user", {
        method: "GET",
        credentials: "include",
        headers,
      });
      console.log("Fetched user:", session.value);
      if (session.value) {
        status.value = AuthStatus.Authenticated;
      } else {
        status.value = AuthStatus.Unauthenticated;
      }
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
      throw error;
    } finally {
      initialized.value = true;
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
    initialized,
  };
}
