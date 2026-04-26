import type { TmdbMovieCreditsResponse } from "@/modules/movie-details/dtos/movie-credits";

export function makeTmdbMovieCredits(
	override?: Partial<TmdbMovieCreditsResponse>,
): TmdbMovieCreditsResponse {
	return {
		id: 1,
		cast: [
			{
				id: 101,
				name: "John Doe",
				character: "The Protagonist",
				order: 0,
				profile_path: "/profile-1.jpg",
			},
			{
				id: 102,
				name: "Jane Doe",
				character: "Neil",
				order: 1,
				profile_path: "/profile-2.jpg",
			},
		],
		crew: [
			{
				id: 201,
				name: "Christopher Nolan",
				job: "Director",
				department: "Directing",
				profile_path: "/director.jpg",
			},
			{
				id: 202,
				name: "Christopher Nolan",
				job: "Writer",
				department: "Writing",
				profile_path: "/director.jpg",
			},
			{
				id: 203,
				name: "Hoyte van Hoytema",
				job: "Director of Photography",
				department: "Camera",
				profile_path: null,
			},
			{
				id: 204,
				name: "Ludwig Göransson",
				job: "Original Music Composer",
				department: "Sound",
				profile_path: null,
			},
			{
				id: 205,
				name: "Jennifer Lame",
				job: "Editor",
				department: "Editing",
				profile_path: null,
			},
		],
		...override,
	};
}
