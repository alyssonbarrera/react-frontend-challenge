import { UsersRound } from "lucide-react";
import {
	CompactError,
	CompactErrorContent,
	CompactErrorDescription,
	CompactErrorIcon,
	CompactErrorRetryButton,
	CompactErrorTitle,
} from "@/core/components/compact-error";
import { MovieDetailSectionLabel } from "../movie-detail-section-label";

type MovieDetailKeyCrewErrorProps = {
	onRetry: VoidFunction;
};

export function MovieDetailKeyCrewError({
	onRetry,
}: MovieDetailKeyCrewErrorProps) {
	return (
		<section
			className="flex flex-col gap-3.5 rounded-[18px] border border-border bg-card p-6"
			data-testid="movie-detail-key-crew-error"
		>
			<MovieDetailSectionLabel>Key Crew</MovieDetailSectionLabel>

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
		</section>
	);
}
