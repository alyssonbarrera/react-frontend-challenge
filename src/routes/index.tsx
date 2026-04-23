import { createFileRoute, redirect } from "@tanstack/react-router";
import { getCookie } from "@/infra/cookies/cookie-utils";
import { LoginScreen } from "@/modules/auth/screens/login-screen";

export const Route = createFileRoute("/")({
	beforeLoad: () => {
		const token = getCookie();

		if (token) {
			throw redirect({ to: "/app" as never });
		}
	},
	component: LoginScreen,
});
