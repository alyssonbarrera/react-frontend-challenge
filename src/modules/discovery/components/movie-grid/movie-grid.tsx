import type { ComponentProps } from "react";
import { VirtuosoGrid, type VirtuosoGridProps } from "react-virtuoso";
import { AsyncState } from "@/core/components/async-state";
import type { Movie } from "../../dtos/movie";
import { MovieCard } from "../movie-card";
import { MovieGridSkeleton } from "../movie-grid-skeleton";
import { MovieGridEmpty } from "./fragments/movie-grid-empty";
import { MovieGridError } from "./fragments/movie-grid-error";
import { MovieGridFooter } from "./fragments/movie-grid-footer";
import { useMovieGrid } from "./movie-grid.hook";

type GridListProps = ComponentProps<"div">;

function GridList({ children, ...props }: GridListProps) {
	return (
		<div
			{...props}
			className="grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4"
			data-testid="movie-grid-list"
		>
			{children}
		</div>
	);
}

function GridItem({ children, ...props }: ComponentProps<"div">) {
	return (
		<div {...props} className="flex" data-testid="movie-grid-item">
			{children}
		</div>
	);
}

export function MovieGrid() {
	const {
		movies,
		isError,
		isPending,
		hasMovies,
		totalCount,
		isFetching,
		hasNextPage,
		searchQuery,
		handleRetry,
		handleEndReached,
		handleRangeChanged,
		isFetchingNextPage,
		initialItemIndex,
	} = useMovieGrid();

	const components: VirtuosoGridProps<Movie, unknown>["components"] = {
		List: GridList,
		Item: GridItem,
		Footer: () => (
			<MovieGridFooter
				isFetchingNextPage={isFetchingNextPage}
				hasNextPage={hasNextPage}
			/>
		),
	};

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
			<VirtuosoGrid
				useWindowScroll
				style={{ flex: 1 }}
				data={movies}
				totalCount={totalCount}
				components={components}
				endReached={handleEndReached}
				rangeChanged={handleRangeChanged}
				initialTopMostItemIndex={initialItemIndex}
				overscan={400}
				itemContent={(_index, movie) => <MovieCard movie={movie} />}
			/>
		</AsyncState>
	);
}
