
import { create } from 'zustand';

type SidebarState = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: true,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
  open: () => set({ isOpen: true }),
}));

type UserState = {
  user: {
    name: string;
    avatar: string;
    role: string;
  } | null;
  setUser: (user: UserState['user']) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: {
    name: 'Jane Smith',
    avatar: 'US',
    role: 'Student',
  },
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
