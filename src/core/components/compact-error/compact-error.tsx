import { type LucideIcon, RefreshCw } from "lucide-react";
import type * as React from "react";
import { cn } from "@/core/lib/utils";
import { Button } from "../ui/button";

type CompactErrorIconProps = {
	icon: LucideIcon;
};

type CompactErrorRetryButtonProps = Omit<
	React.ComponentProps<typeof Button>,
	"variant" | "type"
>;

function CompactError({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="compact-error"
			className={cn("flex flex-col items-center gap-3.5", className)}
			{...props}
		/>
	);
}

function CompactErrorIcon({ icon: Icon }: CompactErrorIconProps) {
	return (
		<div
			data-slot="compact-error-icon-wrapper"
			className="flex size-14 items-center justify-center rounded-full border border-accent-amber/25 bg-accent-amber-soft"
		>
			<Icon
				data-slot="compact-error-icon"
				className="size-6 text-accent-amber"
			/>
		</div>
	);
}

function CompactErrorContent({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="compact-error-content"
			className={cn("flex flex-col items-center gap-1.5", className)}
			{...props}
		/>
	);
}

function CompactErrorLabel({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="compact-error-label"
			className={cn(
				"font-heading font-semibold text-[11px] text-accent-cyan uppercase tracking-[0.18em]",
				className,
			)}
			{...props}
		/>
	);
}

function CompactErrorTitle({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p
			data-slot="compact-error-title"
			className={cn(
				"font-heading font-semibold text-[16px] text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function CompactErrorDescription({
	className,
	...props
}: React.ComponentProps<"p">) {
	return (
		<p
			data-slot="compact-error-description"
			className={cn(
				"text-center text-sm text-secondary leading-relaxed",
				className,
			)}
			{...props}
		/>
	);
}

function CompactErrorRetryButton({
	children,
	className,
	...props
}: CompactErrorRetryButtonProps) {
	return (
		<Button
			data-slot="compact-error-retry-button"
			type="button"
			variant="outline"
			className={className}
			{...props}
		>
			<RefreshCw data-icon="inline-start" />
			{children ?? "Try again"}
		</Button>
	);
}

export {
	CompactError,
	CompactErrorIcon,
	CompactErrorContent,
	CompactErrorLabel,
	CompactErrorTitle,
	CompactErrorDescription,
	CompactErrorRetryButton,
};
