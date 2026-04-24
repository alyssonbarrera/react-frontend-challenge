import { createFileRoute, redirect } from "@tanstack/react-router";
import { hasTokenOnCookie } from "@/infra/cookies/auth-cookie.utils";
import { LoginScreen } from "@/modules/auth/screens/login-screen";

export const Route = createFileRoute("/")({
	beforeLoad: () => {
		if (hasTokenOnCookie()) {
			throw redirect({ to: "/app" });
		}
	},
	component: LoginScreen,
});
