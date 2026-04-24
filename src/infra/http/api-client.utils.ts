import type { BeforeRequestState } from "ky";

const TMDB_BEARER_TOKEN = import.meta.env.VITE_APP_TMDB_KEY;

export function beforeRequest({ request }: BeforeRequestState) {
	if (TMDB_BEARER_TOKEN) {
		request.headers.set("Authorization", `Bearer ${TMDB_BEARER_TOKEN}`);
	}

	request.headers.set("Accept", "application/json");
}
