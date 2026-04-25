import { useNavigate } from "@tanstack/react-router";
import { useSidebar } from "@/core/components/ui/sidebar";
import { useAuthStore } from "@/core/stores/auth-store";

export function useNavUser() {
	const { isMobile } = useSidebar();
	const navigate = useNavigate();
	const clearAuth = useAuthStore((state) => state.clearAuth);

	function handleLogout() {
		clearAuth();
		navigate({ to: "/" });
	}

	return {
		isMobile,
		handleLogout,
	};
}
