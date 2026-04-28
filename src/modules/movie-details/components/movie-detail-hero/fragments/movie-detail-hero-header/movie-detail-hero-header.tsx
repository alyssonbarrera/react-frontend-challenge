import { ArrowLeft, Share2 } from "lucide-react";

type MovieDetailHeroHeaderProps = {
	onBack: VoidFunction;
	onShare: VoidFunction;
};

export function MovieDetailHeroHeader({
	onBack,
	onShare,
}: MovieDetailHeroHeaderProps) {
	return (
		<nav
			className="flex w-full items-center justify-between px-4 pt-4 sm:px-6 sm:pt-6 md:px-10"
			data-testid="movie-detail-hero-header"
		>
			<button
				type="button"
				onClick={onBack}
				className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-surface-base/60 px-3.5 py-2 text-foreground backdrop-blur transition hover:bg-surface-base/80"
				data-testid="movie-detail-hero-header-back"
			>
				<ArrowLeft className="size-3.5" />
				<span className="font-heading font-semibold text-xs">Back</span>
			</button>

			<div className="flex items-center gap-2">
				<button
					type="button"
					onClick={onShare}
					aria-label="Share"
					className="inline-flex cursor-pointer size-9.5 items-center justify-center rounded-full border border-white/10 bg-surface-base/60 text-foreground backdrop-blur transition hover:bg-surface-base/80"
					data-testid="movie-detail-hero-header-share"
				>
					<Share2 className="size-3.5" />
				</button>
			</div>
		</nav>
	);
}
