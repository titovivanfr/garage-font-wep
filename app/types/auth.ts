import type { UserRole } from "~/enums/userRole";

export interface LoginCredentials {
  email: string;
  password: string;
  remember: boolean;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthSession {
  user: AuthUser;
  logout: () => Promise<void>;
  token?: string;
}
