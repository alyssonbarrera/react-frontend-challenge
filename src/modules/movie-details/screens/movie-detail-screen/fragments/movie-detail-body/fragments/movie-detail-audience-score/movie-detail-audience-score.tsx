import { Progress } from "@/core/components/ui/progress";
import { cn } from "@/core/lib/utils";
import { MovieDetailSectionLabel } from "../movie-detail-section-label";

type ScoreBar = {
	label: string;
	tone: "cyan" | "amber";
	percentage: number;
	formattedValue: string;
};

type MovieDetailAudienceScoreProps = {
	formattedScore: string;
	formattedScoreMax: string;
	formattedVotes: string;
	breakdown: ReadonlyArray<ScoreBar>;
};

export function MovieDetailAudienceScore({
	formattedScore,
	formattedScoreMax,
	formattedVotes,
	breakdown,
}: MovieDetailAudienceScoreProps) {
	return (
		<section
			className="flex flex-col gap-4 rounded-[18px] border border-border bg-card p-6"
			data-testid="movie-detail-audience-score"
		>
			<MovieDetailSectionLabel data-testid="movie-detail-audience-score-label">
				Audience Score
			</MovieDetailSectionLabel>

			<div
				className="flex items-baseline gap-2"
				data-testid="movie-detail-audience-score-headline"
			>
				<span className="font-heading font-semibold text-[44px] text-foreground leading-none">
					{formattedScore}
				</span>
				<span className="text-[15px] text-muted-foreground">
					{formattedScoreMax}
				</span>
				<span className="ml-auto text-[12px] text-muted-foreground">
					{formattedVotes}
				</span>
			</div>

			<ul
				className="flex flex-col gap-3"
				data-testid="movie-detail-audience-score-breakdown"
			>
				{breakdown.map((bar) => (
					<li
						key={bar.label}
						className="flex flex-col gap-1.5"
						data-testid="movie-detail-audience-score-bar"
					>
						<div className="flex items-center justify-between text-[12px]">
							<span className="text-muted-foreground">{bar.label}</span>
							<span className="font-semibold text-foreground">
								{bar.formattedValue}
							</span>
						</div>
						<Progress
							value={bar.percentage}
							className={cn(
								"h-1.5 bg-surface-elevated",
								bar.tone === "cyan" &&
									"data-[slot=progress-indicator]:bg-accent-cyan",
								bar.tone === "amber" &&
									"data-[slot=progress-indicator]:bg-accent-amber",
							)}
						/>
					</li>
				))}
			</ul>
		</section>
	);
}
