import { create } from "zustand";

interface UIState {
  isSidebarOpen: boolean;
  isMobileNavOpen: boolean;
  activeModal: string | null;
  theme: "dark";

  toggleSidebar: () => void;
  toggleMobileNav: () => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: true,
  isMobileNavOpen: false,
  activeModal: null,
  theme: "dark",

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleMobileNav: () => set((state) => ({ isMobileNavOpen: !state.isMobileNavOpen })),
  openModal: (modalId: string) => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),
}));
