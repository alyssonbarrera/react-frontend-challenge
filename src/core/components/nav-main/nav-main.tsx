"use client";

import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/core/components/ui/sidebar";

type NavMainProps = {
	sections: {
		label: string;
		items: {
			title: string;
			url: string;
			icon: LucideIcon;
			isActive?: boolean;
			badge?: string;
		}[];
	}[];
};

export function NavMain({ sections }: NavMainProps) {
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
									isActive={item.isActive}
									tooltip={item.title}
									data-testid={`nav-main-item-${sectionIndex}-${itemIndex}-button`}
								>
									<Link to={item.url}>
										<item.icon />
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
								{item.badge ? (
									<SidebarMenuBadge
										data-testid={`nav-main-item-${sectionIndex}-${itemIndex}-badge`}
									>
										{item.badge}
									</SidebarMenuBadge>
								) : null}
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroup>
			))}
		</>
	);
}
