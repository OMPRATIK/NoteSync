// stores/theme-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Themes = "light" | "dark" | "system";

type ThemeState = {
  theme: Themes;
  setTheme: (theme: Themes) => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme: Themes) => set({ theme }),
    }),
    {
      name: "theme",
    }
  )
);
