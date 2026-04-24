import type { ComponentProps } from "react";
import { VirtuosoGrid, type VirtuosoGridProps } from "react-virtuoso";
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
			className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
		isFetchingNextPage,
	} = useMovieGrid();

	if (isPending) {
		return <MovieGridSkeleton />;
	}

	if (isError) {
		return <MovieGridError isRetrying={isFetching} onRetry={handleRetry} />;
	}

	if (!hasMovies) {
		return <MovieGridEmpty searchQuery={searchQuery} />;
	}

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
		<VirtuosoGrid
			useWindowScroll
			style={{ flex: 1 }}
			data={movies}
			totalCount={totalCount}
			components={components}
			endReached={handleEndReached}
			overscan={2000}
			itemContent={(_index, movie) => <MovieCard movie={movie} />}
		/>
	);
}
