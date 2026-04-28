import { ErrorBoundary } from "react-error-boundary";
import { AsyncState } from "@/core/components/async-state";
import {
	MovieDetailSectionShellContent,
	MovieDetailSectionShellLabel,
	MovieDetailSectionShellRoot,
} from "../movie-detail-section-shell";
import { MovieDetailWhereToWatchOption } from "./fragments/movie-detail-where-to-watch-option";
import { useMovieDetailWhereToWatch } from "./movie-detail-where-to-watch.hook";
import { MovieDetailWhereToWatchError } from "./movie-detail-where-to-watch-error";
import { MovieDetailWhereToWatchSkeleton } from "./movie-detail-where-to-watch-skeleton";

function MovieDetailWhereToWatchView() {
	const {
		isError,
		isLoading,
		retryWhereToWatch,
		whereToWatch,
		handleSelectStreamingOption,
	} = useMovieDetailWhereToWatch();

	return (
		<AsyncState
			errorComponent={
				<MovieDetailWhereToWatchError onRetry={retryWhereToWatch} />
			}
			emptyComponent={null}
			isEmpty={!whereToWatch}
			isError={isError}
			isLoading={isLoading}
			loadingComponent={<MovieDetailWhereToWatchSkeleton />}
		>
			{whereToWatch && (
				<MovieDetailSectionShellRoot
					className="gap-4 rounded-[18px] border border-border bg-card p-6"
					data-testid="movie-detail-where-to-watch"
				>
					<MovieDetailSectionShellLabel
						data-testid="movie-detail-where-to-watch-label"
						rightSlot={
							<span
								className="rounded-full border border-border bg-surface-elevated px-2.5 py-1 text-[11px] text-muted-foreground"
								data-testid="movie-detail-where-to-watch-region"
							>
								{whereToWatch.region}
							</span>
						}
					>
						Where to Watch
					</MovieDetailSectionShellLabel>
					<MovieDetailSectionShellContent className="space-y-4">
						<ul
							className="flex flex-col gap-2.5"
							data-testid="movie-detail-where-to-watch-list"
						>
							{whereToWatch.options.map((option) => (
								<MovieDetailWhereToWatchOption
									key={option.id}
									option={option}
									onSelectStreamingOption={handleSelectStreamingOption}
								/>
							))}
						</ul>

						<p
							className="text-[11px] text-muted-foreground"
							data-testid="movie-detail-where-to-watch-footnote"
						>
							{whereToWatch.footnote}
						</p>
					</MovieDetailSectionShellContent>
				</MovieDetailSectionShellRoot>
			)}
		</AsyncState>
	);
}

export function MovieDetailWhereToWatch() {
	return (
		<ErrorBoundary
			fallbackRender={({ resetErrorBoundary }) => (
				<MovieDetailWhereToWatchError onRetry={resetErrorBoundary} />
			)}
		>
			<MovieDetailWhereToWatchView />
		</ErrorBoundary>
	);
}
