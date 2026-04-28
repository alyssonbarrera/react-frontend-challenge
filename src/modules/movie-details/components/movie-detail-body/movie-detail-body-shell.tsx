import type * as React from "react";
import { cn } from "@/core/lib/utils";

function MovieDetailBodyShellRoot({
	className,
	...props
}: React.ComponentProps<"section">) {
	return (
		<section
			data-slot="movie-detail-body-shell-root"
			className={cn(
				"mx-auto flex w-full max-w-384 flex-col gap-8 px-4 pt-10 pb-15 sm:px-6 md:px-10 lg:flex-row",
				className,
			)}
			{...props}
		/>
	);
}

function MovieDetailBodyShellLeft({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="movie-detail-body-shell-left"
			className={cn("flex min-w-0 flex-1 flex-col gap-8", className)}
			{...props}
		/>
	);
}

function MovieDetailBodyShellRight({
	className,
	...props
}: React.ComponentProps<"aside">) {
	return (
		<aside
			data-slot="movie-detail-body-shell-right"
			className={cn("flex w-full shrink-0 flex-col gap-6 lg:w-md", className)}
			{...props}
		/>
	);
}

export {
	MovieDetailBodyShellRoot,
	MovieDetailBodyShellLeft,
	MovieDetailBodyShellRight,
};
