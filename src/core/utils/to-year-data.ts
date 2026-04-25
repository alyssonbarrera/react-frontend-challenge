type YearData = {
	yearLabel: string;
	yearValue: number;
};

export function toYearData(
	releaseDate: string | null | undefined,
	fallbackYearLabel: string,
): YearData {
	const hasReleaseDate =
		typeof releaseDate === "string" && releaseDate.length > 0;
	const parsedYear = hasReleaseDate ? releaseDate.slice(0, 4) : "";

	return {
		yearLabel: parsedYear || fallbackYearLabel,
		yearValue: Number(parsedYear) || 0,
	};
}
