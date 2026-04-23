import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/core/components/ui/button";
import { deleteCookie } from "@/infra/cookies/cookie-utils";

export const Route = createFileRoute("/app/")({
	component: AppHomeRoute,
});

function AppHomeRoute() {
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
			<Button
				onClick={() => {
					deleteCookie();
					window.location.assign("/");
				}}
			>
				Sair
			</Button>
		</main>
	);
}
