import { useNavigate } from "@tanstack/react-router";
import { useSidebar } from "@/core/components/ui/sidebar";
import { useAuthStore } from "@/core/stores/auth-store";
import { useThemeStore } from "@/core/stores/theme-store";

export function useNavUser() {
	const { isMobile } = useSidebar();
	const navigate = useNavigate();
	const clearAuth = useAuthStore((state) => state.clearAuth);
	const theme = useThemeStore((state) => state.theme);
	const setTheme = useThemeStore((state) => state.setTheme);

	function handleLogout() {
		clearAuth();
		navigate({ to: "/" });
	}

	function handleThemeCheckedChange(isChecked: boolean) {
		setTheme(isChecked ? "dark" : "light");
	}

	return {
		isMobile,
		handleLogout,
		isDarkTheme: theme === "dark",
		handleThemeCheckedChange,
	};
}
