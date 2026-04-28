import { cva, type VariantProps } from "class-variance-authority";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { cn } from "@/core/lib/utils";
import type { Movie } from "@/modules/discovery/dtos/movie";
import { useWatchlistToggleButton } from "./watchlist-toggle-button.hook";

const watchlistToggleButtonVariants = cva(
	"cursor-pointer inline-flex items-center justify-center transition outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				pill: "gap-2.5 rounded-xl border px-5.5 py-3.5 font-heading font-semibold text-[14px]",
				icon: "size-9 rounded-full border border-white/10 bg-surface-base/70 opacity-80 hover:opacity-100",
			},
			isInWatchlist: {
				true: "",
				false: "",
			},
		},
		compoundVariants: [
			{
				variant: "pill",
				isInWatchlist: false,
				className:
					"border-white/15 bg-white/5 text-foreground hover:bg-white/10",
			},
			{
				variant: "pill",
				isInWatchlist: true,
				className:
					"border-primary/40 bg-primary/15 text-primary hover:bg-primary/20",
			},
			{
				variant: "icon",
				isInWatchlist: true,
				className: "text-primary",
			},
			{
				variant: "icon",
				isInWatchlist: false,
				className: "text-foreground",
			},
		],
		defaultVariants: {
			variant: "pill",
		},
	},
);

type WatchlistToggleButtonVariants = VariantProps<
	typeof watchlistToggleButtonVariants
>;

type WatchlistToggleButtonProps = {
	movie: Movie;
	variant?: WatchlistToggleButtonVariants["variant"];
	className?: string;
};

export function WatchlistToggleButton({
	movie,
	variant = "pill",
	className,
}: WatchlistToggleButtonProps) {
	const { isInWatchlist, ariaLabel, handleClick } = useWatchlistToggleButton({
		movie,
	});

	const Icon = isInWatchlist ? BookmarkCheck : Bookmark;
	const label = isInWatchlist ? "In watchlist" : "Add to watchlist";

	return (
		<button
			aria-label={ariaLabel}
			aria-pressed={isInWatchlist}
			className={cn(
				watchlistToggleButtonVariants({ variant, isInWatchlist, className }),
			)}
			data-in-watchlist={isInWatchlist}
			data-testid="watchlist-toggle-button"
			onClick={handleClick}
			type="button"
		>
			<Icon
				className={cn(
					variant === "icon" ? "size-4" : "size-3.5",
					isInWatchlist && variant === "icon" && "fill-primary",
				)}
			/>
			{variant === "pill" && <span>{label}</span>}
		</button>
	);
}
