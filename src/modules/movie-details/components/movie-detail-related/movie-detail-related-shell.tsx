import type * as React from "react";
import { cn } from "@/core/lib/utils";
import { MovieDetailSectionLabel } from "../movie-detail-body/fragments/movie-detail-section-label";

function MovieDetailRelatedShellRoot({
	className,
	...props
}: React.ComponentProps<"section">) {
	return (
		<section
			data-slot="movie-detail-related-shell-root"
			className={cn(
				"mx-auto flex w-full max-w-384 flex-col gap-5 px-4 pb-15 sm:px-6 md:px-10",
				className,
			)}
			{...props}
		/>
	);
}

function MovieDetailRelatedShellHeader({
	className,
	...props
}: React.ComponentProps<"header">) {
	return (
		<header
			data-slot="movie-detail-related-shell-header"
			className={cn("flex items-end justify-between gap-4", className)}
			{...props}
		/>
	);
}

function MovieDetailRelatedShellHeaderContent({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="movie-detail-related-shell-header-content"
			className={cn("flex flex-col gap-1.5", className)}
			{...props}
		/>
	);
}

function MovieDetailRelatedShellEyebrow({
	className,
	...props
}: React.ComponentProps<typeof MovieDetailSectionLabel>) {
	return (
		<MovieDetailSectionLabel
			data-slot="movie-detail-related-shell-eyebrow"
			className={cn(className)}
			{...props}
		/>
	);
}

function MovieDetailRelatedShellTitle({
	className,
	...props
}: React.ComponentProps<"h2">) {
	return (
		<h2
			data-slot="movie-detail-related-shell-title"
			className={cn(
				"font-heading font-semibold text-[24px] text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function MovieDetailRelatedShellGrid({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="movie-detail-related-shell-grid"
			className={cn(
				"grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4",
				className,
			)}
			{...props}
		/>
	);
}

export {
	MovieDetailRelatedShellRoot,
	MovieDetailRelatedShellHeader,
	MovieDetailRelatedShellHeaderContent,
	MovieDetailRelatedShellEyebrow,
	MovieDetailRelatedShellTitle,
	MovieDetailRelatedShellGrid,
};
