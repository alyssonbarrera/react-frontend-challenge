import {
	ChevronDown,
	type LucideIcon,
	SlidersHorizontal,
	Star,
	X,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";
import { cn } from "@/core/lib/utils";
import {
	DISCOVERY_GENRES,
	DISCOVERY_MIN_RATINGS,
	DISCOVERY_SORT_OPTIONS,
	DISCOVERY_YEAR_RANGES,
} from "../../constants/discovery-filters";
import type { DiscoveryFilters } from "../../types/discovery-filters";
import { useDiscoveryFilterBar } from "./discovery-filter-bar.hook";

type DiscoveryFilterBarProps = {
	onFiltersChange?: (filters: DiscoveryFilters) => void;
};

export function DiscoveryFilterBar({
	onFiltersChange,
}: DiscoveryFilterBarProps) {
	const {
		filters,
		isGenreActive,
		isYearRangeActive,
		isMinRatingActive,
		hasActiveFilters,
		isDisabled,
		onGenreChange,
		onYearRangeChange,
		onMinRatingChange,
		onSortChange,
		onClearFilters,
	} = useDiscoveryFilterBar({ onFiltersChange });

	const sortLabel =
		DISCOVERY_SORT_OPTIONS.find((option) => option.value === filters.sort)
			?.label ?? "";

	const yearLabel = isYearRangeActive
		? `${filters.yearFrom} — ${filters.yearTo}`
		: "Any year";

	const minRatingLabel = isMinRatingActive ? `${filters.minRating}+` : "Any";

	return (
		<div
			className="flex w-full flex-col items-stretch justify-between gap-4 rounded-2xl border border-border bg-card px-4 py-3 lg:flex-row lg:items-center"
			data-testid="discovery-filter-bar"
		>
			<div className="flex flex-col items-start gap-3 lg:flex-row lg:items-center">
				<div className="flex items-center gap-1.5 text-muted-foreground">
					<SlidersHorizontal className="size-3.5" />
					<span className="font-semibold text-xs tracking-wide">Filter by</span>
				</div>

				<span className="hidden h-6 w-px bg-border lg:inline-block" />

				<div className="flex flex-wrap items-center gap-2.5">
					<FilterChipDropdown
						testId="discovery-filter-bar-genre"
						prefix="Genre:"
						value={filters.genre}
						isActive={isGenreActive}
						isDisabled={isDisabled}
						options={DISCOVERY_GENRES.map((genre) => ({
							label: genre,
							isSelected: genre === filters.genre,
							onSelect: () => onGenreChange(genre),
						}))}
					/>

					<FilterChipDropdown
						testId="discovery-filter-bar-year"
						prefix="Year:"
						value={yearLabel}
						isActive={isYearRangeActive}
						isDisabled={isDisabled}
						options={DISCOVERY_YEAR_RANGES.map((range) => ({
							label: range.label,
							isSelected:
								range.from === filters.yearFrom && range.to === filters.yearTo,
							onSelect: () => onYearRangeChange(range.from, range.to),
						}))}
					/>

					<FilterChipDropdown
						testId="discovery-filter-bar-rating"
						prefix="Rating:"
						value={minRatingLabel}
						isActive={isMinRatingActive}
						isDisabled={isDisabled}
						LeadingIcon={Star}
						leadingIconClassName="text-accent-amber"
						options={DISCOVERY_MIN_RATINGS.map((rating) => ({
							label: rating === 0 ? "Any rating" : `${rating}+`,
							isSelected: rating === filters.minRating,
							onSelect: () => onMinRatingChange(rating),
						}))}
					/>

					{hasActiveFilters && !isDisabled && (
						<button
							type="button"
							onClick={onClearFilters}
							className="cursor-pointer flex items-center gap-1.5 rounded-[10px] px-2.5 py-2 font-medium text-muted-foreground text-xs transition-colors hover:text-foreground"
							data-testid="discovery-filter-bar-clear"
						>
							<X className="size-3" />
							Clear
						</button>
					)}
				</div>
			</div>

			<div className="block h-px w-full bg-border lg:hidden" />

			<div className="flex items-center justify-between gap-2.5 lg:justify-end">
				<span className="font-semibold text-muted-foreground text-xs tracking-wide">
					Sort:
				</span>
				<DropdownMenu>
					<DropdownMenuTrigger asChild disabled={isDisabled}>
						<button
							type="button"
							disabled={isDisabled}
							className="flex cursor-pointer items-center gap-2 rounded-[10px] border border-border bg-surface-elevated px-3.5 py-2 font-semibold text-foreground text-xs transition-colors hover:border-strong disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-border"
							data-testid="discovery-filter-bar-sort"
						>
							{sortLabel}
							<ChevronDown className="size-3.5 text-muted-foreground" />
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="min-w-45">
						{DISCOVERY_SORT_OPTIONS.map((option) => (
							<DropdownMenuItem
								key={option.value}
								onSelect={() => {
									onSortChange(option.value);
								}}
								className="cursor-pointer"
								data-testid={`discovery-filter-bar-sort-option-${option.value}`}
							>
								{option.label}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}

type FilterChipDropdownProps = {
	testId: string;
	prefix: string;
	value: string;
	isActive: boolean;
	isDisabled?: boolean;
	LeadingIcon?: LucideIcon;
	leadingIconClassName?: string;
	options: Array<{
		label: string;
		isSelected: boolean;
		onSelect: VoidFunction;
	}>;
};

function FilterChipDropdown({
	value,
	testId,
	prefix,
	options,
	isActive,
	isDisabled,
	LeadingIcon,
	leadingIconClassName,
}: FilterChipDropdownProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild disabled={isDisabled}>
				<button
					type="button"
					disabled={isDisabled}
					className={cn(
						"flex cursor-pointer items-center gap-2 rounded-[10px] border px-3.5 py-2 text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-50",
						isActive
							? "border-primary/30 bg-primary/10 text-primary hover:bg-primary/15"
							: "border-border bg-surface-elevated text-foreground hover:border-strong",
					)}
					data-testid={testId}
				>
					<span className="font-medium text-secondary">{prefix}</span>
					{LeadingIcon ? (
						<LeadingIcon className={cn("size-3", leadingIconClassName)} />
					) : null}
					<span className="font-semibold">{value}</span>
					<ChevronDown
						className={cn(
							"size-3.5",
							isActive ? "text-primary" : "text-muted-foreground",
						)}
					/>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="min-w-45">
				{options.map((option) => (
					<DropdownMenuItem
						key={option.label}
						onSelect={option.onSelect}
						data-testid={`${testId}-option-${option.label
							.toLowerCase()
							.replace(/\s+/g, "-")}`}
						className={cn(
							"cursor-pointer",
							option.isSelected && "font-semibold text-primary",
						)}
					>
						{option.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
