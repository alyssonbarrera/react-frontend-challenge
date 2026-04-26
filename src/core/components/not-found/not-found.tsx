import { Link } from "@tanstack/react-router";
import { Button } from "@/core/components/ui/button";
import { ErrorState } from "../error-state";

type NotFoundProps = {
	title?: string;
	description?: string;
};

export function NotFound({
	title = "This scene didn't make the final cut.",
	description = "The page you're looking for has been removed, renamed, or never existed in our library. Let's get you back to the films that move you.",
}: NotFoundProps) {
	return (
		<ErrorState
			variant="notFound"
			title={title}
			description={description}
			containerTestId="not-found"
			titleTestId="not-found-title"
			descriptionTestId="not-found-description"
			actions={
				<>
					<Button asChild size="lg">
						<Link to="/discovery" data-testid="not-found-suggestion-discover">
							Go to Discover
						</Link>
					</Button>
					<Button asChild size="lg" variant="outline">
						<Link to="/watchlist" data-testid="not-found-suggestion-watchlist">
							Open Watchlist
						</Link>
					</Button>
				</>
			}
		/>
	);
}
