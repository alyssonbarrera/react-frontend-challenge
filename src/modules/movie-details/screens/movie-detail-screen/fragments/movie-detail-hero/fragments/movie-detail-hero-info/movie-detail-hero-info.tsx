import { Sparkles, Star } from "lucide-react";

type MovieDetailHeroInfoProps = {
	year: string;
	title: string;
	runtime: string;
	director: string;
	primaryGenre: string;
	spotlightLabel: string;
	formattedRating: string;
	formattedRatingMax: string;
};

export function MovieDetailHeroInfo({
	year,
	title,
	runtime,
	director,
	primaryGenre,
	spotlightLabel,
	formattedRating,
	formattedRatingMax,
}: MovieDetailHeroInfoProps) {
	return (
		<div
			className="flex max-w-190 flex-col gap-5"
			data-testid="movie-detail-hero-info"
		>
			<div className="flex items-center gap-2.5">
				<span
					className="inline-flex items-center gap-1.5 rounded-full border border-accent-cyan bg-accent-cyan-soft px-3 py-1.5 font-heading font-bold text-[10px] text-accent-cyan tracking-[0.15em]"
					data-testid="movie-detail-hero-info-spotlight"
				>
					<Sparkles className="size-2.5" />
					{spotlightLabel}
				</span>
				<span
					className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-heading font-bold text-[10px] text-foreground tracking-[0.15em]"
					data-testid="movie-detail-hero-info-genre"
				>
					{primaryGenre}
				</span>
			</div>

			<h1
				className="font-heading font-bold text-[60px] text-foreground leading-[1.05] tracking-[-0.04em]"
				data-testid="movie-detail-hero-info-title"
			>
				{title}
			</h1>

			<div
				className="flex flex-wrap items-center gap-x-4.5 gap-y-1 text-[13px]"
				data-testid="movie-detail-hero-info-meta"
			>
				<span className="inline-flex items-center gap-1.5">
					<Star className="size-3.5 fill-accent-amber text-accent-amber" />
					<span className="font-heading font-bold text-foreground text-sm">
						{formattedRating}
					</span>
					<span className="text-muted-foreground text-xs">
						{formattedRatingMax}
					</span>
				</span>
				<span className="text-muted-foreground">·</span>
				<span className="text-secondary">{year}</span>
				<span className="text-muted-foreground">·</span>
				<span className="text-secondary">{runtime}</span>
				<span className="text-muted-foreground">·</span>
				<span className="text-secondary">{director}</span>
			</div>
		</div>
	);
}
