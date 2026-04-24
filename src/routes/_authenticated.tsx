import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppSidebar } from "@/core/components/app-sidebar";
import { AuthenticatedLayoutHeader } from "@/core/components/authenticated-layout-header";
import { SidebarInset, SidebarProvider } from "@/core/components/ui/sidebar";
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
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<AuthenticatedLayoutHeader />
				<div className="flex flex-1 flex-col p-4 md:p-6">
					<Outlet />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
