import { Download, Play, ShoppingBag } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { MovieDetailSectionLabel } from "../movie-detail-section-label";

type StreamingOption = {
	id: string;
	label: string;
	icon: "play" | "download" | "shopping-bag";
};

type MovieDetailWhereToWatchProps = {
	region: string;
	options: ReadonlyArray<StreamingOption>;
	footnote: string;
	onSelectOption: (optionId: string) => void;
};

const ICON_MAP: Record<
	StreamingOption["icon"],
	ComponentType<SVGProps<SVGSVGElement>>
> = {
	play: Play,
	download: Download,
	"shopping-bag": ShoppingBag,
};

export function MovieDetailWhereToWatch({
	region,
	options,
	footnote,
	onSelectOption,
}: MovieDetailWhereToWatchProps) {
	return (
		<section
			className="flex flex-col gap-4 rounded-[18px] border border-border bg-card p-6"
			data-testid="movie-detail-where-to-watch"
		>
			<header className="flex items-center justify-between">
				<MovieDetailSectionLabel data-testid="movie-detail-where-to-watch-label">
					Where to Watch
				</MovieDetailSectionLabel>
				<span
					className="rounded-full border border-border bg-surface-elevated px-2.5 py-1 text-[11px] text-muted-foreground"
					data-testid="movie-detail-where-to-watch-region"
				>
					{region}
				</span>
			</header>

			<ul
				className="flex flex-col gap-2.5"
				data-testid="movie-detail-where-to-watch-list"
			>
				{options.map((option) => {
					const Icon = ICON_MAP[option.icon];
					return (
						<li key={option.id}>
							<button
								type="button"
								onClick={() => onSelectOption(option.id)}
								className="flex w-full items-center gap-3 rounded-[14px] border border-border bg-surface-elevated px-4 py-3 text-left text-[13px] text-foreground transition hover:border-accent-cyan/40 hover:bg-surface-elevated/80"
								data-testid="movie-detail-where-to-watch-option"
							>
								<Icon className="size-4 text-accent-cyan" />
								<span className="font-medium">{option.label}</span>
							</button>
						</li>
					);
				})}
			</ul>

			<p
				className="text-[11px] text-muted-foreground"
				data-testid="movie-detail-where-to-watch-footnote"
			>
				{footnote}
			</p>
		</section>
	);
}
