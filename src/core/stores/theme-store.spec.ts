import { THEME_STORAGE_KEY, useThemeStore } from "./theme-store";

const initialState = useThemeStore.getState();

describe("useThemeStore", () => {
	beforeEach(() => {
		useThemeStore.setState(initialState);
		localStorage.clear();
	});

	it("should be able to initialize with dark theme", async () => {
		const { theme } = useThemeStore.getState();

		expect(theme).toBe("dark");
	});

	it("should be able to set light theme", async () => {
		useThemeStore.getState().setTheme("light");

		const { theme } = useThemeStore.getState();

		expect(theme).toBe("light");
	});

	it("should be able to toggle theme from dark to light", async () => {
		useThemeStore.setState({ ...initialState, theme: "dark" });

		useThemeStore.getState().toggleTheme();

		const { theme } = useThemeStore.getState();

		expect(theme).toBe("light");
	});

	it("should be able to toggle theme from light to dark", async () => {
		useThemeStore.setState({ ...initialState, theme: "light" });

		useThemeStore.getState().toggleTheme();

		const { theme } = useThemeStore.getState();

		expect(theme).toBe("dark");
	});

	it("should be able to persist theme in localStorage", async () => {
		useThemeStore.getState().setTheme("light");

		const persistedThemeRaw = localStorage.getItem(THEME_STORAGE_KEY);

		expect(persistedThemeRaw).toBeTruthy();
		expect(persistedThemeRaw).toContain('"theme":"light"');
	});

	it("should be able to rehydrate theme from localStorage", async () => {
		useThemeStore.setState({ ...initialState, theme: "dark" });

		localStorage.setItem(
			THEME_STORAGE_KEY,
			JSON.stringify({ state: { theme: "light" }, version: 0 }),
		);

		await useThemeStore.persist.rehydrate();

		const { theme } = useThemeStore.getState();

		expect(theme).toBe("light");
	});
});
