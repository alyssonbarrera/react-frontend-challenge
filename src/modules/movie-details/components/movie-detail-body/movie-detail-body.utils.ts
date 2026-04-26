import {
	MOVIE_DETAIL_KEY_CREW_JOBS,
	MOVIE_DETAIL_MAX_CAST_MEMBERS,
	MOVIE_DETAIL_PROVIDERS_REGION,
	MOVIE_DETAIL_RATING_MAX,
	type MovieDetailCrewJob,
} from "../../constants/movie-detail.constants";
import type { MovieCredits } from "../../dtos/movie-credits";
import type { MovieDetails } from "../../dtos/movie-details";
import type { MovieVideos } from "../../dtos/movie-videos";
import type {
	MovieWatchProviders,
	WatchProviderRegion,
} from "../../dtos/movie-watch-providers";

export type CastMember = {
	id: string;
	name: string;
	role: string;
	profilePath: string | null;
};

export type CrewMember = {
	role: string;
	name: string;
};

export type StreamingOption = {
	id: string;
	label: string;
	icon: "play" | "download" | "shopping-bag";
};

export type MovieDetailBodyData = {
	synopsis: string;
	cast: ReadonlyArray<CastMember>;
	trailer: {
		title: string;
		key: string;
	} | null;
	audienceScore: {
		score: number;
		max: number;
		votes: number;
	};
	keyCrew: ReadonlyArray<CrewMember>;
	whereToWatch: {
		region: string;
		options: ReadonlyArray<StreamingOption>;
		footnote: string;
	} | null;
};

const PROVIDERS_LOCALE = "en-US";
const providersPluralRules = new Intl.PluralRules(PROVIDERS_LOCALE);

function getPreferredTrailer(videos: MovieVideos | undefined) {
	const trailerCandidates =
		videos?.results.filter(
			(video) => video.site === "YouTube" && video.type === "Trailer",
		) ?? [];

	if (trailerCandidates.length === 0) {
		return null;
	}

	const fallbackTrailer = trailerCandidates[0];
	const officialTrailer = trailerCandidates.find((video) => video.official);
	const preferredTrailer = officialTrailer ?? fallbackTrailer;

	return preferredTrailer;
}

function mapCast(credits: MovieCredits | undefined): ReadonlyArray<CastMember> {
	if (!credits) {
		return [];
	}

	const limitedCast = credits.cast.slice(0, MOVIE_DETAIL_MAX_CAST_MEMBERS);
	const mappedCast = limitedCast.map((member) => ({
		id: String(member.id),
		name: member.name,
		role: member.character,
		profilePath: member.profilePath,
	}));

	return mappedCast;
}

function mapKeyCrew(
	credits: MovieCredits | undefined,
): ReadonlyArray<CrewMember> {
	if (!credits) {
		return [];
	}

	const mapCrewJobToKeyCrewMember = createCrewJobToKeyCrewMemberMapper(
		credits.crew,
	);

	return MOVIE_DETAIL_KEY_CREW_JOBS.flatMap(mapCrewJobToKeyCrewMember);
}

function createCrewJobToKeyCrewMemberMapper(crew: MovieCredits["crew"]) {
	return function mapCrewJobToKeyCrewMember(
		crewJob: MovieDetailCrewJob,
	): ReadonlyArray<CrewMember> {
		const member = crew.find((person) => person.job === crewJob.job);

		if (!member) {
			return [];
		}

		return [{ role: crewJob.label, name: member.name }];
	};
}

function buildStreamingOptions(
	regionData: WatchProviderRegion | null,
): ReadonlyArray<StreamingOption> {
	if (!regionData) {
		return [];
	}

	const options: StreamingOption[] = [];

	if (regionData.flatrate.length > 0) {
		options.push({
			id: "stream",
			label: `Stream · ${regionData.flatrate[0].providerName}`,
			icon: "play",
		});
	}

	if (regionData.rent.length > 0) {
		options.push({
			id: "rent",
			label: `Rent · ${regionData.rent[0].providerName}`,
			icon: "download",
		});
	}

	if (regionData.buy.length > 0) {
		options.push({
			id: "buy",
			label: `Buy · ${regionData.buy[0].providerName}`,
			icon: "shopping-bag",
		});
	}

	return options;
}

function buildWhereToWatch(
	watchProviders: MovieWatchProviders | undefined,
): MovieDetailBodyData["whereToWatch"] {
	const regionData =
		watchProviders?.results[MOVIE_DETAIL_PROVIDERS_REGION] ?? null;
	const options = buildStreamingOptions(regionData);

	if (!regionData || options.length === 0) {
		return null;
	}

	const totalProviders =
		regionData.flatrate.length + regionData.rent.length + regionData.buy.length;
	const providerLabel =
		providersPluralRules.select(totalProviders) === "one"
			? "platform"
			: "platforms";

	return {
		options,
		region: MOVIE_DETAIL_PROVIDERS_REGION,
		footnote: `Available on ${totalProviders} ${providerLabel} in your region.`,
	};
}

export function mapMovieDetailsToBodyData(params: {
	movie: MovieDetails;
	credits: MovieCredits | undefined;
	videos: MovieVideos | undefined;
	watchProviders: MovieWatchProviders | undefined;
}): MovieDetailBodyData {
	const { movie, credits, videos, watchProviders } = params;
	const preferredTrailer = getPreferredTrailer(videos);

	return {
		synopsis: movie.overview,
		cast: mapCast(credits),
		trailer: preferredTrailer
			? {
					title: preferredTrailer.name,
					key: preferredTrailer.key,
				}
			: null,
		audienceScore: {
			score: movie.voteAverage,
			max: MOVIE_DETAIL_RATING_MAX,
			votes: movie.voteCount,
		},
		keyCrew: mapKeyCrew(credits),
		whereToWatch: buildWhereToWatch(watchProviders),
	};
}

export function formatAudienceScore(score: number): string {
	return score.toFixed(1);
}

export function formatAudienceScoreMax(max: number): string {
	return `/ ${max}`;
}

export function formatAudienceVotes(votes: number): string {
	return `${votes.toLocaleString("en-US")} votes`;
}

export function toAudienceScorePercentage(score: number, max: number): number {
	if (max <= 0) {
		return 0;
	}

	return Math.round((score / max) * 100);
}
