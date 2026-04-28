import type { Movie } from "@/modules/discovery/dtos/movie";
import { buildPosterUrl } from "@/modules/discovery/utils/movie.utils";
import {
	MOVIE_DETAIL_MINUTES_IN_HOUR,
	MOVIE_DETAIL_RATING_MAX,
} from "../../constants/movie-detail.constants";
import type { MovieCredits } from "../../dtos/movie-credits";
import type { MovieDetails } from "../../dtos/movie-details";

const TMDB_BACKDROP_URL = "https://image.tmdb.org/t/p/original";
const RELEASE_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const RUNTIME_LOCALE = "en-US";

const releaseDateFormatter = new Intl.DateTimeFormat(RUNTIME_LOCALE, {
	month: "short",
	day: "numeric",
	year: "numeric",
	timeZone: "UTC",
});

const runtimeHourFormatter = new Intl.NumberFormat(RUNTIME_LOCALE, {
	style: "unit",
	unit: "hour",
	unitDisplay: "narrow",
	maximumFractionDigits: 0,
});

const runtimeMinuteFormatter = new Intl.NumberFormat(RUNTIME_LOCALE, {
	style: "unit",
	unit: "minute",
	unitDisplay: "narrow",
	maximumFractionDigits: 0,
});

export type MovieDetailHeroData = {
	title: string;
	backdropUrl: string;
	posterUrl: string;
	primaryGenre: string;
	rating: number;
	ratingMax: number;
	releaseDate: string;
	runtime: string;
	director: string;
};

export function buildBackdropUrl(backdropPath: string | null): string {
	if (!backdropPath) {
		return "";
	}

	return `${TMDB_BACKDROP_URL}${backdropPath}`;
}

export function formatRuntime(runtime: number | null): string {
	if (!runtime) {
		return "";
	}

	const hours = Math.floor(runtime / MOVIE_DETAIL_MINUTES_IN_HOUR);
	const minutes = runtime % MOVIE_DETAIL_MINUTES_IN_HOUR;
	const formattedHours = runtimeHourFormatter.format(hours);
	const formattedMinutes = runtimeMinuteFormatter.format(minutes);

	if (hours === 0) {
		return formattedMinutes;
	}

	if (minutes === 0) {
		return formattedHours;
	}

	return `${formattedHours} ${formattedMinutes}`;
}

export function formatReleaseDate(releaseDate: string): string {
	if (!releaseDate || !RELEASE_DATE_PATTERN.test(releaseDate)) {
		return "";
	}

	const [yearRaw, monthRaw, dayRaw] = releaseDate.split("-");
	const year = Number(yearRaw);
	const month = Number(monthRaw);
	const day = Number(dayRaw);

	if (
		!Number.isInteger(year) ||
		!Number.isInteger(month) ||
		!Number.isInteger(day)
	) {
		return "";
	}

	const parsedReleaseDate = new Date(Date.UTC(year, month - 1, day));

	if (
		parsedReleaseDate.getUTCFullYear() !== year ||
		parsedReleaseDate.getUTCMonth() !== month - 1 ||
		parsedReleaseDate.getUTCDate() !== day
	) {
		return "";
	}

	return releaseDateFormatter.format(parsedReleaseDate);
}

export function getDirectorLabel(credits: MovieCredits | undefined): string {
	const directorName =
		credits?.crew.find((member) => member.job === "Director")?.name ?? "";

	if (!directorName) {
		return "";
	}

	return `dir. ${directorName}`;
}

export function mapMovieDetailsToHeroData(
	movie: MovieDetails,
	credits: MovieCredits | undefined,
): MovieDetailHeroData {
	return {
		title: movie.title,
		backdropUrl: buildBackdropUrl(movie.backdropPath),
		posterUrl: buildPosterUrl(movie.posterPath, "w500"),
		primaryGenre: movie.genres[0]?.name.toUpperCase() ?? "",
		rating: movie.voteAverage,
		ratingMax: MOVIE_DETAIL_RATING_MAX,
		releaseDate: formatReleaseDate(movie.releaseDate),
		runtime: formatRuntime(movie.runtime),
		director: getDirectorLabel(credits),
	};
}

export function mapMovieDetailsToWatchlistMovie(movie: MovieDetails): Movie {
	const genreIds = movie.genres.map((genre) => genre.id);
	const movieForWatchlist: Movie = {
		...movie,
		genreIds,
	};

	return movieForWatchlist;
}

export function formatHeroRating(rating: number): string {
	return rating.toFixed(1);
}

export function formatHeroRatingMax(ratingMax: number): string {
	return `/ ${ratingMax}`;
}
