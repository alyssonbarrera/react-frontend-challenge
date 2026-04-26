"use client";

import {
	Calendar,
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
import { CineDashLogo } from "../cinedash-logo";

const user = {
	id: crypto.randomUUID(),
	name: "Alex Morgan",
	email: "john.doe@cinedash.com",
	avatarUrl: null,
};

const sections: ComponentProps<typeof NavMain>["sections"] = [
	{
		label: "BROWSE",
		items: [
			{
				title: "Discover",
				url: "/discovery",
				activePath: "/discovery",
				icon: Compass,
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
				badgeSource: "watchlist-count",
			},
		],
	},
];

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
							<CineDashLogo className="size-8!" />
							<div className="flex flex-col gap-0.5 leading-none">
								<span
									className="font-heading font-bold text-lg tracking-[-0.02em]"
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
