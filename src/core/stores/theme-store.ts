import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Theme = "light" | "dark";

type ThemeState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	toggleTheme: VoidFunction;
};

export const THEME_STORAGE_KEY = "cinedash:theme";

export const useThemeStore = create<ThemeState>()(
	persist(
		(set, get) => ({
			theme: "dark",
			setTheme: (theme) => {
				set({ theme });
			},
			toggleTheme: () => {
				const currentTheme = get().theme;
				set({ theme: currentTheme === "dark" ? "light" : "dark" });
			},
		}),
		{
			name: THEME_STORAGE_KEY,
			storage: createJSONStorage(() => localStorage),
		},
	),
);
