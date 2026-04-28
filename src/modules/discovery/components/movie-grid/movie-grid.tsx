import { AsyncState } from "@/core/components/async-state";
import { MovieCard } from "../movie-card";
import { MovieGridSkeleton } from "../movie-grid-skeleton";
import { MovieGridEmpty } from "./fragments/movie-grid-empty";
import { MovieGridError } from "./fragments/movie-grid-error";
import { MovieGridFooter } from "./fragments/movie-grid-footer";
import { useMovieGrid, useMovieGridVirtualization } from "./movie-grid.hook";

export function MovieGrid() {
	const {
		movies,
		isError,
		isPending,
		hasMovies,
		isFetching,
		hasNextPage,
		searchQuery,
		handleRetry,
		handleEndReached,
		isFetchingNextPage,
	} = useMovieGrid();

	const {
		gridRef,
		virtualRows,
		totalSize,
		scrollMargin,
		getMoviesForRow,
		measureRowElement,
	} = useMovieGridVirtualization({
		movies,
		handleEndReached,
	});

	return (
		<AsyncState
			errorComponent={
				<MovieGridError isRetrying={isFetching} onRetry={handleRetry} />
			}
			emptyComponent={<MovieGridEmpty searchQuery={searchQuery} />}
			isEmpty={!hasMovies}
			isError={isError}
			isLoading={isPending}
			loadingComponent={<MovieGridSkeleton />}
		>
			<div
				ref={gridRef}
				className="relative"
				data-testid="movie-grid-virtualizer"
			>
				<div className="relative w-full" style={{ height: `${totalSize}px` }}>
					{virtualRows.map((virtualRow) => {
						const rowMovies = getMoviesForRow(virtualRow.index);

						return (
							<div
								key={virtualRow.key}
								data-index={virtualRow.index}
								ref={measureRowElement}
								className="absolute left-0 top-0 w-full"
								style={{
									transform: `translateY(${virtualRow.start - scrollMargin}px)`,
								}}
							>
								<div className="grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4">
									{rowMovies.map((movie) => (
										<MovieCard key={movie.id} movie={movie} />
									))}
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<MovieGridFooter
				isFetchingNextPage={isFetchingNextPage}
				hasNextPage={hasNextPage}
			/>
		</AsyncState>
	);
}
