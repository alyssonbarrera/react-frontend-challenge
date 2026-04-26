import { MovieDetailSectionLabel } from "../movie-detail-section-label";
import { MovieDetailCastCard } from "./fragments/movie-detail-cast-card";
import { MovieDetailCastError } from "./movie-detail-cast-error";
import { MovieDetailCastSkeleton } from "./movie-detail-cast-skeleton";

type CastMember = {
	id: string;
	name: string;
	role: string;
	profilePath: string | null;
};

type MovieDetailCastProps = {
	cast?: ReadonlyArray<CastMember>;
	isLoading: boolean;
	isError: boolean;
};

export function MovieDetailCast({
	cast,
	isError,
	isLoading,
}: MovieDetailCastProps) {
	if (isError) {
		return <MovieDetailCastError />;
	}

	if (isLoading) {
		return <MovieDetailCastSkeleton />;
	}

	if (!cast || cast.length === 0) {
		return null;
	}

	return (
		<section className="flex flex-col gap-4.5" data-testid="movie-detail-cast">
			<header className="flex items-center justify-between">
				<MovieDetailSectionLabel data-testid="movie-detail-cast-label">
					Cast
				</MovieDetailSectionLabel>
			</header>
			<div
				className="grid grid-cols-2 gap-3.5 md:grid-cols-4"
				data-testid="movie-detail-cast-grid"
			>
				{cast.map((member) => (
					<MovieDetailCastCard
						key={member.id}
						name={member.name}
						role={member.role}
						profilePath={member.profilePath}
					/>
				))}
			</div>
		</section>
	);
}
