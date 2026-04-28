import { Film } from "lucide-react";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/core/components/ui/empty";

type MovieGridEmptyProps = {
	searchQuery?: string;
};

export function MovieGridEmpty({ searchQuery }: MovieGridEmptyProps = {}) {
	const isSearchEmpty = Boolean(searchQuery);

	return (
		<Empty data-testid="movie-grid-empty">
			<EmptyHeader>
				<EmptyMedia>
					<Film />
				</EmptyMedia>
				<EmptyTitle>
					{isSearchEmpty
						? `No movies found for "${searchQuery}"`
						: "No movies found"}
				</EmptyTitle>
				<EmptyDescription>
					{isSearchEmpty
						? "Try a different search term or clear the search."
						: "Try adjusting your filters or come back later."}
				</EmptyDescription>
			</EmptyHeader>
		</Empty>
	);
}
