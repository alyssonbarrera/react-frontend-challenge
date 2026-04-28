import type { MovieCredits } from "@/modules/movie-details/dtos/movie-credits";

export function makeMovieCredits(
	override?: Partial<MovieCredits>,
): MovieCredits {
	return {
		movieId: 1,
		cast: [
			{
				id: 101,
				name: "John Doe",
				character: "The Protagonist",
				order: 0,
				profilePath: "/profile-1.jpg",
			},
			{
				id: 102,
				name: "Jane Doe",
				character: "Neil",
				order: 1,
				profilePath: "/profile-2.jpg",
			},
		],
		crew: [
			{
				id: 201,
				name: "Christopher Nolan",
				job: "Director",
				department: "Directing",
				profilePath: "/director.jpg",
			},
			{
				id: 202,
				name: "Christopher Nolan",
				job: "Writer",
				department: "Writing",
				profilePath: "/director.jpg",
			},
			{
				id: 203,
				name: "Hoyte van Hoytema",
				job: "Director of Photography",
				department: "Camera",
				profilePath: null,
			},
			{
				id: 204,
				name: "Ludwig Göransson",
				job: "Original Music Composer",
				department: "Sound",
				profilePath: null,
			},
			{
				id: 205,
				name: "Jennifer Lame",
				job: "Editor",
				department: "Editing",
				profilePath: null,
			},
		],
		...override,
	};
}
