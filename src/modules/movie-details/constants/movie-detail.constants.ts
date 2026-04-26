export const MOVIE_DETAIL_RATING_MAX = 10;
export const MOVIE_DETAIL_PROVIDERS_REGION = "US";
export const MOVIE_DETAIL_MAX_CAST_MEMBERS = 8;
export const MOVIE_DETAIL_MINUTES_IN_HOUR = 60;

export type MovieDetailCrewJob = {
	job: string;
	label: string;
};

export const MOVIE_DETAIL_KEY_CREW_JOBS: ReadonlyArray<MovieDetailCrewJob> = [
	{ job: "Director", label: "Director" },
	{ job: "Screenplay", label: "Screenplay" },
	{ job: "Director of Photography", label: "Cinematography" },
	{ job: "Original Music Composer", label: "Score" },
	{ job: "Editor", label: "Editor" },
];
