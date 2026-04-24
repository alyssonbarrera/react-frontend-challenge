import { Search } from "lucide-react";
import { Input } from "@/core/components/ui/input";
import { useDiscoverySearchInput } from "./discovery-search-input.hook";

type DiscoverySearchInputProps = {
	debounceInMs?: number;
	onDebouncedValueChange?: (value: string) => void;
};

export function DiscoverySearchInput({
	debounceInMs,
	onDebouncedValueChange,
}: DiscoverySearchInputProps) {
	const { searchValue, onSearchValueChange } = useDiscoverySearchInput({
		debounceInMs,
		onDebouncedValueChange,
	});

	return (
		<div className="flex md:max-w-130 mx-auto h-11 w-full items-center gap-3 rounded-xl border border-border/80 bg-card px-4">
			<Search className="size-4 text-muted-foreground" />
			<Input
				type="search"
				value={searchValue}
				onChange={(event) => {
					onSearchValueChange(event.target.value);
				}}
				placeholder="Search films, directors, actors..."
				className="h-auto border-0 rounded-none bg-transparent p-0 text-sm placeholder:text-muted-foreground focus-visible:ring-0"
				data-testid="dashboard-movie-search-input"
			/>
		</div>
	);
}
