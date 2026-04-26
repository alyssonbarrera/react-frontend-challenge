import { ErrorBoundary } from "react-error-boundary";
import { MovieDetailSectionLabel } from "../movie-detail-section-label";
import { MovieDetailKeyCrewError } from "./movie-detail-key-crew-error";
import { MovieDetailKeyCrewSkeleton } from "./movie-detail-key-crew-skeleton";

type CrewMember = {
	role: string;
	name: string;
};

type MovieDetailKeyCrewProps = {
	crew?: ReadonlyArray<CrewMember>;
	isLoading: boolean;
	isError: boolean;
	onRetry: VoidFunction;
};

function MovieDetailKeyCrewView({
	crew,
	isError,
	isLoading,
	onRetry,
}: MovieDetailKeyCrewProps) {
	if (isError) {
		return <MovieDetailKeyCrewError onRetry={onRetry} />;
	}

	if (isLoading) {
		return <MovieDetailKeyCrewSkeleton />;
	}

	if (!crew || crew.length === 0) {
		return null;
	}

	return (
		<section
			className="flex flex-col gap-4 rounded-[18px] border border-border bg-card p-6"
			data-testid="movie-detail-key-crew"
		>
			<MovieDetailSectionLabel data-testid="movie-detail-key-crew-label">
				Key Crew
			</MovieDetailSectionLabel>

			<dl
				className="flex flex-col gap-2.5 text-[13px]"
				data-testid="movie-detail-key-crew-list"
			>
				{crew.map((member) => (
					<div
						key={member.role}
						className="flex items-center justify-between gap-4"
						data-testid="movie-detail-key-crew-item"
					>
						<dt className="text-muted-foreground">{member.role}</dt>
						<dd className="text-right font-medium text-foreground">
							{member.name}
						</dd>
					</div>
				))}
			</dl>
		</section>
	);
}

export function MovieDetailKeyCrew(props: MovieDetailKeyCrewProps) {
	return (
		<ErrorBoundary
			fallbackRender={({ resetErrorBoundary }) => (
				<MovieDetailKeyCrewError onRetry={resetErrorBoundary} />
			)}
		>
			<MovieDetailKeyCrewView {...props} />
		</ErrorBoundary>
	);
}
