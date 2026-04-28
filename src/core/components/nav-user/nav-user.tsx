"use client";

import { ChevronsUpDown, LogOut, SunMoon } from "lucide-react";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/core/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/core/components/ui/sidebar";
import { Switch } from "@/core/components/ui/switch";
import type { UserDTO } from "@/core/dtos/user-dto";
import { useNavUser } from "./nav-user.hook";

type NavUserProps = {
	user: UserDTO;
};

export function NavUser({ user }: NavUserProps) {
	const { isMobile, handleLogout, isDarkTheme, handleThemeCheckedChange } =
		useNavUser();

	const initials = getInitials(user.name);

	return (
		<SidebarMenu data-testid="nav-user-menu">
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="border cursor-pointer rounded-full border-border bg-surface-elevated text-foreground data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							data-testid="nav-user-trigger"
						>
							<Avatar className="h-8 w-8 rounded-full">
								<AvatarImage
									src={user.avatarUrl ?? undefined}
									alt={user.name}
								/>
								<AvatarFallback className="rounded-full bg-accent-amber font-heading font-bold text-surface-base text-[13px]">
									{initials}
								</AvatarFallback>
							</Avatar>
							<div
								className="grid flex-1 text-left text-sm leading-tight"
								data-testid="nav-user-identity"
							>
								<span
									className="truncate font-semibold text-foreground"
									data-testid="nav-user-name"
								>
									{user.name}
								</span>
								<span
									className="truncate text-[11px] text-muted-foreground"
									data-testid="nav-user-email"
								>
									{user.email}
								</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
						data-testid="nav-user-dropdown-content"
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-full">
									<AvatarImage
										src={user.avatarUrl ?? undefined}
										alt={user.name}
									/>
									<AvatarFallback className="rounded-full bg-accent-amber font-heading font-bold text-surface-base">
										{initials}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium text-foreground">
										{user.name}
									</span>
									<span className="truncate text-xs text-muted-foreground">
										{user.email}
									</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onSelect={(event) => event.preventDefault()}
							data-testid="nav-user-theme-item"
						>
							<SunMoon />
							<span className="flex-1" data-testid="nav-user-theme-label">
								Dark mode
							</span>
							<Switch
								size="sm"
								checked={isDarkTheme}
								onCheckedChange={handleThemeCheckedChange}
								aria-label="Toggle theme"
								className="cursor-pointer"
								data-testid="nav-user-theme-toggle"
							/>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onSelect={handleLogout}
							className="cursor-pointer"
							data-testid="nav-user-logout-item"
						>
							<LogOut />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

function getInitials(name: string): string {
	return name
		.split(" ")
		.map((part) => part.charAt(0))
		.slice(0, 2)
		.join("")
		.toUpperCase();
}
