import { AsyncState } from "@/core/components/async-state";
import {
	MovieDetailSectionHeaderRoot,
	MovieDetailSectionHeaderTitle,
} from "../movie-detail-section-header";
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
	const castMembers = cast ?? [];

	return (
		<AsyncState
			errorComponent={<MovieDetailCastError />}
			emptyComponent={null}
			isEmpty={castMembers.length === 0}
			isError={isError}
			isLoading={isLoading}
			loadingComponent={<MovieDetailCastSkeleton />}
		>
			<section
				className="flex flex-col gap-4.5"
				data-testid="movie-detail-cast"
			>
				<MovieDetailSectionHeaderRoot>
					<MovieDetailSectionHeaderTitle>
						<MovieDetailSectionLabel data-testid="movie-detail-cast-label">
							Cast
						</MovieDetailSectionLabel>
					</MovieDetailSectionHeaderTitle>
				</MovieDetailSectionHeaderRoot>
				<div
					className="grid grid-cols-2 gap-3.5 md:grid-cols-4"
					data-testid="movie-detail-cast-grid"
				>
					{castMembers.map((member) => (
						<MovieDetailCastCard
							key={member.id}
							name={member.name}
							role={member.role}
							profilePath={member.profilePath}
						/>
					))}
				</div>
			</section>
		</AsyncState>
	);
}
