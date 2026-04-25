"use client";

import {
	Calendar,
	Clapperboard,
	Compass,
	Flame,
	Heart,
	History,
	ListVideo,
} from "lucide-react";
import type { ComponentProps } from "react";
import { NavMain } from "@/core/components/nav-main";
import { NavUser } from "@/core/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/core/components/ui/sidebar";
import { useWatchlistStore } from "@/modules/watchlist/stores/watchlist-store";

const user = {
	id: crypto.randomUUID(),
	name: "Alex Morgan",
	email: "john.doe@cinedash.com",
	avatarUrl: null,
};

function buildSections(watchlistCount: number) {
	return [
		{
			label: "BROWSE",
			items: [
				{
					title: "Discover",
					url: "/discovery",
					activePath: "/discovery",
					icon: Compass,
				},
				{
					title: "Trending",
					url: "/discovery",
					icon: Flame,
				},
				{
					title: "New releases",
					url: "/discovery",
					icon: Calendar,
				},
			],
		},
		{
			label: "LIBRARY",
			items: [
				{
					title: "Watchlist",
					url: "/watchlist",
					activePath: "/watchlist",
					icon: ListVideo,
					badge: String(watchlistCount),
				},
				{
					title: "Favorites",
					url: "/discovery",
					icon: Heart,
				},
				{
					title: "History",
					url: "/discovery",
					icon: History,
				},
			],
		},
	];
}

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
	const watchlistCount = useWatchlistStore((state) => state.items.length);
	const sections = buildSections(watchlistCount);

	return (
		<Sidebar collapsible="icon" data-testid="app-sidebar" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							size="lg"
							className="pointer-events-none"
							data-testid="app-sidebar-brand"
						>
							<div className="flex size-8 aspect-square items-center justify-center rounded-lg bg-sidebar-primary">
								<Clapperboard className="text-black!" />
							</div>
							<div className="flex flex-col gap-0.5 leading-none">
								<span
									className="font-heading text-base font-semibold"
									data-testid="app-sidebar-brand-title"
								>
									CineDash
								</span>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent data-testid="app-sidebar-content">
				<NavMain sections={sections} />
			</SidebarContent>
			<SidebarFooter data-testid="app-sidebar-footer">
				<NavUser user={user} />
			</SidebarFooter>
			<SidebarRail data-testid="app-sidebar-rail" />
		</Sidebar>
	);
}
