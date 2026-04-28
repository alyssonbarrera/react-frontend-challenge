import { Download, Play, ShoppingBag } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

type MovieDetailWhereToWatchOptionIcon = "play" | "download" | "shopping-bag";

type MovieDetailWhereToWatchOptionData = {
	id: string;
	label: string;
	icon: MovieDetailWhereToWatchOptionIcon;
};

type MovieDetailWhereToWatchOptionProps = {
	option: MovieDetailWhereToWatchOptionData;
	onSelectStreamingOption: (optionId: string) => void;
};

const ICON_MAP: Record<
	MovieDetailWhereToWatchOptionIcon,
	ComponentType<SVGProps<SVGSVGElement>>
> = {
	play: Play,
	download: Download,
	"shopping-bag": ShoppingBag,
};

export function MovieDetailWhereToWatchOption({
	option,
	onSelectStreamingOption,
}: MovieDetailWhereToWatchOptionProps) {
	const Icon = ICON_MAP[option.icon];

	return (
		<li>
			<button
				type="button"
				onClick={() => onSelectStreamingOption(option.id)}
				className="flex cursor-pointer w-full items-center gap-3 rounded-[14px] border border-border bg-surface-elevated px-4 py-3 text-left text-[13px] text-foreground transition hover:border-accent-cyan/40 hover:bg-surface-elevated/80"
				data-testid="movie-detail-where-to-watch-option"
			>
				<Icon className="size-4 text-accent-cyan" />
				<span className="font-medium">{option.label}</span>
			</button>
		</li>
	);
}
