import type * as React from "react";
import { cn } from "@/core/lib/utils";

type MovieDetailHeroShellBackdropImageProps = Omit<
	React.ComponentProps<"img">,
	"alt"
> & {
	alt: string;
};

type DataAttributes = {
	[key: `data-${string}`]: string | number | boolean | undefined;
};

type ShellOverlayProps = Omit<
	React.ComponentProps<typeof MovieDetailHeroShellOverlay>,
	"children"
> &
	DataAttributes;

type ShellOverlaySideProps = Omit<
	React.ComponentProps<typeof MovieDetailHeroShellOverlaySide>,
	"children"
> &
	DataAttributes;

type ShellOverlayTopProps = Omit<
	React.ComponentProps<typeof MovieDetailHeroShellOverlayTop>,
	"children"
> &
	DataAttributes;

type MovieDetailHeroShellBackdropLayersProps = {
	children: React.ReactNode;
	overlayProps?: ShellOverlayProps;
	overlaySideProps?: ShellOverlaySideProps;
	overlayTopProps?: ShellOverlayTopProps;
};

function MovieDetailHeroShellRoot({
	className,
	...props
}: React.ComponentProps<"section">) {
	return (
		<section
			data-slot="movie-detail-hero-shell-root"
			className={cn(
				"relative isolate flex min-h-160 w-full flex-col overflow-hidden bg-surface-elevated md:h-[80vh] md:max-h-205",
				className,
			)}
			{...props}
		/>
	);
}

function MovieDetailHeroShellBackdropImage({
	alt,
	className,
	...props
}: MovieDetailHeroShellBackdropImageProps) {
	return (
		<img
			alt={alt}
			data-slot="movie-detail-hero-shell-backdrop-image"
			className={cn(
				"absolute inset-0 -z-20 h-full w-full object-cover object-[center_20%]",
				className,
			)}
			{...props}
		/>
	);
}

function MovieDetailHeroShellBackdrop({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			aria-hidden
			data-slot="movie-detail-hero-shell-backdrop"
			className={cn("-z-20 absolute inset-0", className)}
			{...props}
		/>
	);
}

function MovieDetailHeroShellOverlay({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			aria-hidden
			data-slot="movie-detail-hero-shell-overlay"
			className={cn(
				"-z-10 absolute inset-0 bg-linear-to-t from-surface-base via-surface-base/70 via-40% to-transparent",
				className,
			)}
			{...props}
		/>
	);
}

function MovieDetailHeroShellOverlaySide({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			aria-hidden
			data-slot="movie-detail-hero-shell-overlay-side"
			className={cn(
				"-z-10 absolute inset-0 bg-linear-to-r from-surface-base/90 via-surface-base/40 via-40% to-transparent",
				className,
			)}
			{...props}
		/>
	);
}

function MovieDetailHeroShellOverlayTop({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			aria-hidden
			data-slot="movie-detail-hero-shell-overlay-top"
			className={cn(
				"-z-10 absolute inset-x-0 top-0 h-32 bg-linear-to-b from-surface-base/70 to-transparent",
				className,
			)}
			{...props}
		/>
	);
}

function MovieDetailHeroShellBackdropLayers({
	children,
	overlayProps,
	overlaySideProps,
	overlayTopProps,
}: MovieDetailHeroShellBackdropLayersProps) {
	return (
		<>
			{children}
			<MovieDetailHeroShellOverlay {...overlayProps} />
			<MovieDetailHeroShellOverlaySide {...overlaySideProps} />
			<MovieDetailHeroShellOverlayTop {...overlayTopProps} />
		</>
	);
}

function MovieDetailHeroShellContent({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="movie-detail-hero-shell-content"
			className={cn(
				"mt-auto flex flex-col gap-4 px-4 pb-4 sm:flex-row sm:items-end sm:gap-6 sm:px-6 sm:pb-6 md:gap-10 md:px-10 md:pb-10",
				className,
			)}
			{...props}
		/>
	);
}

function MovieDetailHeroShellMain({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="movie-detail-hero-shell-main"
			className={cn("flex flex-1 flex-col gap-5", className)}
			{...props}
		/>
	);
}

function MovieDetailHeroShellContentRow({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="movie-detail-hero-shell-content-row"
			className={cn("flex items-end gap-4 sm:contents md:gap-10", className)}
			{...props}
		/>
	);
}

function MovieDetailHeroShellMobileActions({
	children,
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div className={cn("sm:hidden", className)} {...props}>
			{children}
		</div>
	);
}

export {
	MovieDetailHeroShellRoot,
	MovieDetailHeroShellBackdropImage,
	MovieDetailHeroShellBackdrop,
	MovieDetailHeroShellOverlay,
	MovieDetailHeroShellOverlaySide,
	MovieDetailHeroShellOverlayTop,
	MovieDetailHeroShellBackdropLayers,
	MovieDetailHeroShellContent,
	MovieDetailHeroShellContentRow,
	MovieDetailHeroShellMain,
	MovieDetailHeroShellMobileActions,
};
