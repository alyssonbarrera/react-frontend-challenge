import { DiscoveryFilterBar } from "../../components/discovery-filter-bar";
import { DiscoveryPageHeader } from "../../components/discovery-page-header";
import { MovieGrid } from "../../components/movie-grid";

export function DiscoveryScreen() {
	return (
		<main
			className="mx-auto flex w-full max-w-384 flex-col gap-6"
			data-testid="discovery-screen"
		>
			<DiscoveryPageHeader />
			<DiscoveryFilterBar />
			<MovieGrid />
		</main>
	);
}
