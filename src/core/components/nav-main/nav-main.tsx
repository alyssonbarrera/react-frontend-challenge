"use client";

import { Link, useLocation } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/core/components/ui/sidebar";
import { useWatchlistStore } from "@/modules/watchlist/stores/watchlist-store";

const WATCHLIST_BADGE_SOURCE = "watchlist-count";

type NavMainProps = {
	sections: {
		label: string;
		items: {
			title: string;
			url: string;
			activePath?: string;
			icon: LucideIcon;
			badge?: string;
			badgeSource?: typeof WATCHLIST_BADGE_SOURCE;
		}[];
	}[];
};

export function NavMain({ sections }: NavMainProps) {
	const pathname = useLocation({ select: (location) => location.pathname });

	function isPathActive(path: string): boolean {
		return pathname === path || pathname.startsWith(`${path}/`);
	}

	return (
		<>
			{sections.map((section, sectionIndex) => (
				<SidebarGroup
					key={section.label}
					data-testid={`nav-main-section-${sectionIndex}`}
				>
					<SidebarGroupLabel
						data-testid={`nav-main-section-${sectionIndex}-label`}
					>
						{section.label}
					</SidebarGroupLabel>
					<SidebarMenu data-testid={`nav-main-section-${sectionIndex}-menu`}>
						{section.items.map((item, itemIndex) => (
							<SidebarMenuItem
								key={item.title}
								data-testid={`nav-main-item-${sectionIndex}-${itemIndex}`}
							>
								<SidebarMenuButton
									asChild
									isActive={
										item.activePath ? isPathActive(item.activePath) : false
									}
									tooltip={item.title}
									data-testid={`nav-main-item-${sectionIndex}-${itemIndex}-button`}
								>
									<Link to={item.url}>
										<item.icon />
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
								{item.badgeSource === WATCHLIST_BADGE_SOURCE ? (
									<WatchlistMenuBadge
										testId={`nav-main-item-${sectionIndex}-${itemIndex}-badge`}
									/>
								) : (
									item.badge && (
										<SidebarMenuBadge
											data-testid={`nav-main-item-${sectionIndex}-${itemIndex}-badge`}
										>
											{item.badge}
										</SidebarMenuBadge>
									)
								)}
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroup>
			))}
		</>
	);
}

type WatchlistMenuBadgeProps = {
	testId: string;
};

function WatchlistMenuBadge({ testId }: WatchlistMenuBadgeProps) {
	const watchlistCount = useWatchlistStore((state) => state.items.length);

	return (
		<SidebarMenuBadge data-testid={testId}>
			{String(watchlistCount)}
		</SidebarMenuBadge>
	);
}
