import type * as React from "react";
import { cn } from "@/core/lib/utils";

function MovieDetailSectionHeaderRoot({
	className,
	...props
}: React.ComponentProps<"header">) {
	return (
		<header
			data-slot="movie-detail-section-header-root"
			className={cn("flex items-center justify-between", className)}
			{...props}
		/>
	);
}

function MovieDetailSectionHeaderTitle({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="movie-detail-section-header-title"
			className={cn(className)}
			{...props}
		/>
	);
}

function MovieDetailSectionHeaderRightSlot({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="movie-detail-section-header-right-slot"
			className={cn("flex items-center", className)}
			{...props}
		/>
	);
}

export {
	MovieDetailSectionHeaderRoot,
	MovieDetailSectionHeaderTitle,
	MovieDetailSectionHeaderRightSlot,
};
