import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { hasTokenOnCookie } from "@/infra/cookies/auth-cookie.utils";

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: () => {
		if (!hasTokenOnCookie()) {
			throw redirect({ to: "/" });
		}
	},
	component: AuthenticatedLayoutRoute,
});

function AuthenticatedLayoutRoute() {
	return <Outlet />;
}
