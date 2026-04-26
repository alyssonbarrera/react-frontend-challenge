import { MovieDetailAudienceScore } from "./fragments/movie-detail-audience-score";
import { MovieDetailCast } from "./fragments/movie-detail-cast";
import { MovieDetailKeyCrew } from "./fragments/movie-detail-key-crew";
import { MovieDetailSynopsis } from "./fragments/movie-detail-synopsis";
import { MovieDetailTrailer } from "./fragments/movie-detail-trailer";
import { MovieDetailWhereToWatch } from "./fragments/movie-detail-where-to-watch";
import { useMovieDetailBody } from "./movie-detail-body.hook";
import { MovieDetailBodyError } from "./movie-detail-body-error";
import { MovieDetailBodySkeleton } from "./movie-detail-body-skeleton";

export function MovieDetailBody() {
	const {
		body,
		isError,
		isLoading,
		formattedScore,
		formattedVotes,
		formattedScoreMax,
		scorePercentage,
		handleSelectStreamingOption,
	} = useMovieDetailBody();

	if (isError) {
		return <MovieDetailBodyError />;
	}

	if (isLoading || !body) {
		return <MovieDetailBodySkeleton />;
	}

	return (
		<section
			className="flex flex-col gap-8 px-10 pt-10 pb-15 lg:flex-row"
			data-testid="movie-detail-body"
		>
			<div
				className="flex min-w-0 flex-1 flex-col gap-8"
				data-testid="movie-detail-body-left"
			>
				<MovieDetailSynopsis synopsis={body.synopsis} />

				{body.cast.length > 0 && <MovieDetailCast cast={body.cast} />}

				{body.trailer && (
					<MovieDetailTrailer
						title={body.trailer.title}
						youtubeKey={body.trailer.key}
					/>
				)}
			</div>

			<aside
				className="flex w-full shrink-0 flex-col gap-6 lg:sticky lg:top-6 lg:w-md lg:self-start"
				data-testid="movie-detail-body-right"
			>
				<MovieDetailAudienceScore
					formattedScore={formattedScore}
					formattedScoreMax={formattedScoreMax}
					formattedVotes={formattedVotes}
					scorePercentage={scorePercentage}
				/>

				{body.keyCrew.length > 0 && <MovieDetailKeyCrew crew={body.keyCrew} />}

				{body.whereToWatch && (
					<MovieDetailWhereToWatch
						region={body.whereToWatch.region}
						options={body.whereToWatch.options}
						footnote={body.whereToWatch.footnote}
						onSelectOption={handleSelectStreamingOption}
					/>
				)}
			</aside>
		</section>
	);
}
