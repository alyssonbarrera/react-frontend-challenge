import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { hasTokenOnCookie } from "@/infra/cookies/auth-cookie.utils";

export const Route = createFileRoute("/app")({
	beforeLoad: () => {
		if (!hasTokenOnCookie()) {
			throw redirect({ to: "/" });
		}
	},
	component: AppLayout,
});

function AppLayout() {
	return <Outlet />;
}
