import { GlobalSearchInput } from "@/core/components/global-search-input";
import { SidebarTrigger } from "@/core/components/ui/sidebar";

export function AuthenticatedLayoutHeader() {
	return (
		<header
			className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 border-b border-border bg-background px-4 py-4 md:px-6"
			data-testid="authenticated-layout-header"
		>
			<SidebarTrigger data-testid="authenticated-layout-header-sidebar-trigger" />

			<GlobalSearchInput />

			<div
				className="size-8"
				aria-hidden="true"
				data-testid="authenticated-layout-header-spacer"
			/>
		</header>
	);
}
