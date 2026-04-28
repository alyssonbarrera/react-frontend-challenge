import { UsersRound } from "lucide-react";
import {
	CompactError,
	CompactErrorContent,
	CompactErrorDescription,
	CompactErrorIcon,
	CompactErrorRetryButton,
	CompactErrorTitle,
} from "@/core/components/compact-error";
import {
	MovieDetailSectionShellContent,
	MovieDetailSectionShellLabel,
	MovieDetailSectionShellRoot,
} from "../movie-detail-section-shell";

type MovieDetailKeyCrewErrorProps = {
	onRetry: VoidFunction;
};

export function MovieDetailKeyCrewError({
	onRetry,
}: MovieDetailKeyCrewErrorProps) {
	return (
		<MovieDetailSectionShellRoot
			className="rounded-[18px] border border-border bg-card p-6"
			data-testid="movie-detail-key-crew-error"
		>
			<MovieDetailSectionShellLabel>Key Crew</MovieDetailSectionShellLabel>
			<MovieDetailSectionShellContent>
				<CompactError className="px-3 pt-2 pb-3">
					<CompactErrorIcon icon={UsersRound} />

					<CompactErrorContent>
						<CompactErrorTitle data-testid="movie-detail-key-crew-error-title">
							Couldn't load crew
						</CompactErrorTitle>
						<CompactErrorDescription>
							Crew details are temporarily unavailable. Try again in a moment.
						</CompactErrorDescription>
					</CompactErrorContent>

					<CompactErrorRetryButton
						data-testid="movie-detail-key-crew-error-retry"
						onClick={onRetry}
					>
						Try again
					</CompactErrorRetryButton>
				</CompactError>
			</MovieDetailSectionShellContent>
		</MovieDetailSectionShellRoot>
	);
}
