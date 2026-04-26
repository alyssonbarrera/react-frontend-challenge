import type * as React from "react";
import { cn } from "@/core/lib/utils";
import {
	MovieDetailSectionHeaderRightSlot,
	MovieDetailSectionHeaderRoot,
	MovieDetailSectionHeaderTitle,
} from "../movie-detail-section-header";
import { MovieDetailSectionLabel } from "../movie-detail-section-label";

function MovieDetailSectionShellRoot({
	className,
	...props
}: React.ComponentProps<"section">) {
	return (
		<section
			data-slot="movie-detail-section-shell-root"
			className={cn("flex flex-col gap-3.5", className)}
			{...props}
		/>
	);
}

function MovieDetailSectionShellLabel({
	children,
	className,
	rightSlot,
	containerClassName,
	...props
}: Omit<React.ComponentProps<typeof MovieDetailSectionLabel>, "children"> & {
	children: React.ReactNode;
	rightSlot?: React.ReactNode;
	containerClassName?: string;
}) {
	const label = (
		<MovieDetailSectionLabel className={cn(className)} {...props}>
			{children}
		</MovieDetailSectionLabel>
	);

	return (
		<div
			data-slot="movie-detail-section-shell-label"
			className={cn(containerClassName)}
		>
			{rightSlot ? (
				<MovieDetailSectionHeaderRoot>
					<MovieDetailSectionHeaderTitle>{label}</MovieDetailSectionHeaderTitle>
					<MovieDetailSectionHeaderRightSlot>
						{rightSlot}
					</MovieDetailSectionHeaderRightSlot>
				</MovieDetailSectionHeaderRoot>
			) : (
				label
			)}
		</div>
	);
}

function MovieDetailSectionShellContent({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="movie-detail-section-shell-content"
			className={cn(className)}
			{...props}
		/>
	);
}

export {
	MovieDetailSectionShellRoot,
	MovieDetailSectionShellLabel,
	MovieDetailSectionShellContent,
};
