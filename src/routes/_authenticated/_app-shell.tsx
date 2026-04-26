import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "@/core/components/app-sidebar";
import { AuthenticatedLayoutHeader } from "@/core/components/authenticated-layout-header";
import { SidebarInset, SidebarProvider } from "@/core/components/ui/sidebar";

export const Route = createFileRoute("/_authenticated/_app-shell")({
	component: AppShellLayoutRoute,
});

function AppShellLayoutRoute() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset className="min-w-0">
				<AuthenticatedLayoutHeader />
				<div className="flex min-w-0 flex-1 flex-col p-4 md:p-6">
					<Outlet />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
