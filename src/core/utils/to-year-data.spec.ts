import { toYearData } from "./to-year-data";

describe("toYearData", () => {
	it("should be able to return parsed year when releaseDate is valid", () => {
		const yearData = toYearData("2024-11-01", "Unknown");

		expect(yearData).toEqual({
			yearLabel: "2024",
			yearValue: 2024,
		});
	});

	it("should be able to return fallback label and zero when releaseDate is an empty string", () => {
		const yearData = toYearData("", "Unknown");

		expect(yearData).toEqual({
			yearLabel: "Unknown",
			yearValue: 0,
		});
	});

	it("should be able to return fallback label and zero when releaseDate is null", () => {
		const yearData = toYearData(null, "Unknown");

		expect(yearData).toEqual({
			yearLabel: "Unknown",
			yearValue: 0,
		});
	});

	it("should be able to return fallback label and zero when releaseDate is undefined", () => {
		const yearData = toYearData(undefined, "Unknown");

		expect(yearData).toEqual({
			yearLabel: "Unknown",
			yearValue: 0,
		});
	});

	it("should be able to return non-numeric parsed label and zero value", () => {
		const yearData = toYearData("abcd-01-01", "Unknown");

		expect(yearData).toEqual({
			yearLabel: "abcd",
			yearValue: 0,
		});
	});
});
