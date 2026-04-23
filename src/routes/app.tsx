import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getCookie } from "@/infra/cookies/cookie-utils";

export const Route = createFileRoute("/app")({
	beforeLoad: () => {
		const token = getCookie();

		if (!token) {
			throw redirect({ to: "/" });
		}
	},
	component: AppLayout,
});

function AppLayout() {
	return <Outlet />;
}
