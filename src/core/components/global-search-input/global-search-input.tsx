import { Search } from "lucide-react";
import { Input } from "@/core/components/ui/input";
import { useGlobalSearchInput } from "./global-search-input.hook";

type GlobalSearchInputProps = {
	debounceInMs?: number;
	placeholder?: string;
	onDebouncedValueChange?: (value: string) => void;
};

export function GlobalSearchInput({
	debounceInMs,
	placeholder = "Search films...",
	onDebouncedValueChange,
}: GlobalSearchInputProps) {
	const { searchValue, onSearchValueChange } = useGlobalSearchInput({
		debounceInMs,
		onDebouncedValueChange,
	});

	return (
		<div className="mx-auto flex h-11 w-full items-center gap-3 rounded-xl border border-border/80 bg-card px-4 md:max-w-130">
			<Search className="size-4 text-muted-foreground" />
			<Input
				type="search"
				value={searchValue}
				onChange={(event) => {
					onSearchValueChange(event.target.value);
				}}
				placeholder={placeholder}
				className="h-auto rounded-none border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground focus-visible:ring-0"
				data-testid="global-search-input"
			/>
		</div>
	);
}
