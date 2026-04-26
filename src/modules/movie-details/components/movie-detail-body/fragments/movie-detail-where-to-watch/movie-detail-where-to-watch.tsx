import { ErrorBoundary } from "react-error-boundary";
import { MovieDetailSectionLabel } from "../movie-detail-section-label";
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

	if (isLoading) {
		return <MovieDetailWhereToWatchSkeleton />;
	}

	if (isError) {
		return <MovieDetailWhereToWatchError onRetry={retryWhereToWatch} />;
	}

	if (!whereToWatch) {
		return null;
	}

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
					{whereToWatch.region}
				</span>
			</header>

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
		</section>
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
