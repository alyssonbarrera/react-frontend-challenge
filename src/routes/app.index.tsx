import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/core/components/ui/button";
import { Switch } from "@/core/components/ui/switch";
import { useAuthStore } from "@/core/stores/auth-store";
import { useThemeStore } from "@/core/stores/theme-store";

export const Route = createFileRoute("/app/")({
	component: AppHomeRoute,
});

function AppHomeRoute() {
	const clearAuth = useAuthStore((state) => state.clearAuth);
	const theme = useThemeStore((state) => state.theme);
	const setTheme = useThemeStore((state) => state.setTheme);

	const isDarkTheme = theme === "dark";

	return (
		<main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-5 px-4 text-center">
			<p className="rounded-full border border-border bg-card px-4 py-1 text-xs text-muted-foreground">
				Authenticated area
			</p>
			<h1 className="font-heading text-4xl font-semibold tracking-tight">
				Welcome to CineDash App
			</h1>
			<p className="max-w-xl text-sm text-muted-foreground md:text-base">
				Sua autenticacao esta funcionando. Esta rota e protegida pelo TanStack
				Router.
			</p>
			<div className="flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2">
				<span className="text-xs text-muted-foreground">Light</span>
				<Switch
					checked={isDarkTheme}
					onCheckedChange={(checked) => {
						setTheme(checked ? "dark" : "light");
					}}
					size="sm"
				/>
				<span className="text-xs text-muted-foreground">Dark</span>
			</div>
			<Button
				onClick={() => {
					clearAuth();
					window.location.assign("/");
				}}
			>
				Sair
			</Button>
		</main>
	);
}
