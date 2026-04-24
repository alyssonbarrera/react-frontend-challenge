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

const data = {
	user: {
		id: crypto.randomUUID(),
		name: "Alex Morgan",
		email: "john.doe@cinedash.com",
		avatarUrl: null,
	},
	sections: [
		{
			label: "BROWSE",
			items: [
				{
					title: "Discover",
					url: "/app",
					icon: Compass,
					isActive: true,
				},
				{
					title: "Trending",
					url: "/app",
					icon: Flame,
				},
				{
					title: "New releases",
					url: "/app",
					icon: Calendar,
				},
			],
		},
		{
			label: "LIBRARY",
			items: [
				{
					title: "Watchlist",
					url: "/app",
					icon: ListVideo,
					badge: "24",
				},
				{
					title: "Favorites",
					url: "/app",
					icon: Heart,
				},
				{
					title: "History",
					url: "/app",
					icon: History,
				},
			],
		},
	],
};

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
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
				<NavMain sections={data.sections} />
			</SidebarContent>
			<SidebarFooter data-testid="app-sidebar-footer">
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail data-testid="app-sidebar-rail" />
		</Sidebar>
	);
}
