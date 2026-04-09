import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/lib/api";
import type { User, ApiResponse } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, confirmPassword: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  clearError: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await api.post<ApiResponse<{
            user: User;
            accessToken: string;
            refreshToken: string;
          }>>("/auth/login", { email, password });

          if (data.success && data.data) {
            localStorage.setItem("accessToken", data.data.accessToken);
            localStorage.setItem("refreshToken", data.data.refreshToken);
            set({
              user: data.data.user,
              isAuthenticated: true,
              isLoading: false,
            });
          }
        } catch (error: unknown) {
          const err = error as { response?: { data?: { message?: string } } };
          set({
            error: err.response?.data?.message || "Login failed",
            isLoading: false,
          });
          throw error;
        }
      },

      register: async (name: string, email: string, password: string, confirmPassword: string) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await api.post<ApiResponse<{
            user: User;
            accessToken: string;
            refreshToken: string;
          }>>("/auth/register", { name, email, password, confirmPassword });

          if (data.success && data.data) {
            localStorage.setItem("accessToken", data.data.accessToken);
            localStorage.setItem("refreshToken", data.data.refreshToken);
            set({
              user: data.data.user,
              isAuthenticated: true,
              isLoading: false,
            });
          }
        } catch (error: unknown) {
          const err = error as { response?: { data?: { message?: string } } };
          set({
            error: err.response?.data?.message || "Registration failed",
            isLoading: false,
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            await api.post("/auth/logout", { refreshToken });
          }
        } catch {
          // Ignore logout errors
        } finally {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      fetchProfile: async () => {
        try {
          const { data } = await api.get<ApiResponse<User>>("/auth/profile");
          if (data.success && data.data) {
            set({ user: data.data, isAuthenticated: true });
          }
        } catch {
          set({ user: null, isAuthenticated: false });
        }
      },

      clearError: () => set({ error: null }),

      setUser: (user: User) => set({ user }),
    }),
    {
      name: "apex-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
