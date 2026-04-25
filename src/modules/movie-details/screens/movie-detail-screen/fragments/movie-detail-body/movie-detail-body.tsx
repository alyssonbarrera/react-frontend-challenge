import { MovieDetailAudienceScore } from "./fragments/movie-detail-audience-score";
import { MovieDetailCast } from "./fragments/movie-detail-cast";
import { MovieDetailKeyCrew } from "./fragments/movie-detail-key-crew";
import { MovieDetailSynopsis } from "./fragments/movie-detail-synopsis";
import { MovieDetailTrailer } from "./fragments/movie-detail-trailer";
import { MovieDetailWhereToWatch } from "./fragments/movie-detail-where-to-watch";
import { useMovieDetailBody } from "./movie-detail-body.hook";

type MovieDetailBodyProps = {
	id: string;
};

export function MovieDetailBody({ id }: MovieDetailBodyProps) {
	const {
		body,
		formattedScore,
		formattedVotes,
		scoreBreakdown,
		formattedScoreMax,
		handleSelectStreamingOption,
	} = useMovieDetailBody({ id });

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
				<MovieDetailCast cast={body.cast} />
				<MovieDetailTrailer
					title={body.trailer.title}
					quality={body.trailer.quality}
					duration={body.trailer.duration}
				/>
			</div>

			<aside
				className="flex w-full shrink-0 flex-col gap-6 lg:w-md"
				data-testid="movie-detail-body-right"
			>
				<MovieDetailAudienceScore
					formattedScore={formattedScore}
					formattedScoreMax={formattedScoreMax}
					formattedVotes={formattedVotes}
					breakdown={scoreBreakdown}
				/>
				<MovieDetailKeyCrew crew={body.keyCrew} />
				<MovieDetailWhereToWatch
					region={body.whereToWatch.region}
					options={body.whereToWatch.options}
					footnote={body.whereToWatch.footnote}
					onSelectOption={handleSelectStreamingOption}
				/>
			</aside>
		</section>
	);
}
