import type * as React from "react";
import { Activity } from "react";
import { cn } from "@/core/lib/utils";

type PageHeaderBadgeProps = {
	label: string;
	icon?: React.ReactNode;
};

function PageHeader({ className, ...props }: React.ComponentProps<"header">) {
	return (
		<header
			data-slot="page-header"
			className={cn("flex w-full flex-col gap-1.5", className)}
			{...props}
		/>
	);
}

function PageHeaderContent({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="page-header-content"
			className={cn("flex flex-col gap-1.5", className)}
			{...props}
		/>
	);
}

function PageHeaderBadge({
	label,
	icon,
	className,
	...props
}: PageHeaderBadgeProps & React.ComponentProps<"span">) {
	return (
		<div
			data-slot="page-header-badge-group"
			className="flex items-center gap-2"
		>
			<Activity mode={icon ? "visible" : "hidden"}>{icon}</Activity>
			<span
				data-slot="page-header-badge"
				className={cn(
					"font-semibold text-[11px] text-primary tracking-[0.18em]",
					className,
				)}
				{...props}
			>
				{label}
			</span>
		</div>
	);
}

function PageHeaderTitle({ className, ...props }: React.ComponentProps<"h1">) {
	return (
		<h1
			data-slot="page-header-title"
			className={cn(
				"font-heading font-semibold text-3xl text-foreground tracking-tight md:text-[32px]",
				className,
			)}
			{...props}
		/>
	);
}

function PageHeaderSubtitle({
	className,
	...props
}: React.ComponentProps<"p">) {
	return (
		<p
			data-slot="page-header-subtitle"
			className={cn("text-[13px] text-secondary", className)}
			{...props}
		/>
	);
}

export {
	PageHeader,
	PageHeaderContent,
	PageHeaderBadge,
	PageHeaderTitle,
	PageHeaderSubtitle,
};
