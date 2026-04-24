import { SidebarTrigger } from "@/core/components/ui/sidebar";
import { DiscoverySearchInput } from "@/modules/discovery/components/discovery-search-input";

export function AuthenticatedLayoutHeader() {
	return (
		<header
			className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 border-b border-border bg-background px-4 py-4 md:px-6"
			data-testid="authenticated-layout-header"
		>
			<SidebarTrigger data-testid="authenticated-layout-header-sidebar-trigger" />

			<DiscoverySearchInput />

			<div
				className="size-8"
				aria-hidden="true"
				data-testid="authenticated-layout-header-spacer"
			/>
		</header>
	);
}
