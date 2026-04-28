import { Star } from "lucide-react";

type MovieDetailHeroInfoProps = {
	title: string;
	runtime: string;
	director: string;
	releaseDate: string;
	primaryGenre: string;
	formattedRating: string;
	formattedRatingMax: string;
};

export function MovieDetailHeroInfo({
	title,
	runtime,
	director,
	releaseDate,
	primaryGenre,
	formattedRating,
	formattedRatingMax,
}: MovieDetailHeroInfoProps) {
	return (
		<div
			className="flex max-w-190 flex-col gap-5"
			data-testid="movie-detail-hero-info"
		>
			{primaryGenre && (
				<div className="flex items-center gap-2.5">
					<span
						className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-heading font-bold text-[10px] text-foreground tracking-[0.15em]"
						data-testid="movie-detail-hero-info-genre"
					>
						{primaryGenre}
					</span>
				</div>
			)}

			<h1
				className="font-heading font-bold text-[24px] text-foreground leading-[1.05] tracking-[-0.04em] sm:text-[45px] md:text-[60px]"
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
				<span className="text-secondary">{releaseDate}</span>

				{runtime && (
					<>
						<span className="text-muted-foreground">·</span>
						<span className="text-secondary">{runtime}</span>
					</>
				)}

				{director && (
					<>
						<span className="text-muted-foreground">·</span>
						<span className="text-secondary">{director}</span>
					</>
				)}
			</div>
		</div>
	);
}
