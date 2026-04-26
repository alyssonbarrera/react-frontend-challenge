import { ErrorBoundary } from "react-error-boundary";
import { Player } from "@/core/components/player";
import {
	MovieDetailSectionShellContent,
	MovieDetailSectionShellLabel,
	MovieDetailSectionShellRoot,
} from "../movie-detail-section-shell";
import { useMovieDetailTrailer } from "./movie-detail-trailer.hook";
import { MovieDetailTrailerError } from "./movie-detail-trailer-error";
import { MovieDetailTrailerSkeleton } from "./movie-detail-trailer-skeleton";

function MovieDetailTrailerView() {
	const { trailer, isLoading, isError, retry } = useMovieDetailTrailer();

	if (isLoading) {
		return <MovieDetailTrailerSkeleton />;
	}

	if (isError) {
		return <MovieDetailTrailerError onRetry={retry} />;
	}

	if (!trailer) {
		return null;
	}

	return (
		<MovieDetailSectionShellRoot
			className="scroll-mt-6"
			data-testid="movie-detail-trailer"
			id="movie-detail-trailer"
		>
			<MovieDetailSectionShellLabel data-testid="movie-detail-trailer-label">
				Trailer
			</MovieDetailSectionShellLabel>
			<MovieDetailSectionShellContent>
				<div
					className="relative flex aspect-880/440 w-full overflow-hidden rounded-[18px] border border-border bg-surface-elevated"
					data-testid="movie-detail-trailer-box"
				>
					<Player title={trailer.title} youtubeKey={trailer.youtubeKey} />
				</div>
			</MovieDetailSectionShellContent>
		</MovieDetailSectionShellRoot>
	);
}

export function MovieDetailTrailer() {
	return (
		<ErrorBoundary
			fallbackRender={({ resetErrorBoundary }) => (
				<MovieDetailTrailerError onRetry={resetErrorBoundary} />
			)}
		>
			<MovieDetailTrailerView />
		</ErrorBoundary>
	);
}
