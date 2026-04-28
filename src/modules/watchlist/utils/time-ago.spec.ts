import { timeAgo } from "./time-ago";

describe("timeAgo", () => {
	const fixedNow = new Date("2026-04-25T12:00:00.000Z");

	it("should be able to return just now when the date is invalid", () => {
		const formattedTimeAgo = timeAgo("invalid-date", fixedNow);

		expect(formattedTimeAgo).toBe("just now");
	});

	it("should be able to return just now when less than one minute has passed", () => {
		const isoDate = new Date(fixedNow.getTime() - 30 * 1000).toISOString();

		const formattedTimeAgo = timeAgo(isoDate, fixedNow);

		expect(formattedTimeAgo).toBe("just now");
	});

	it("should not be able to return a relative label when the date is in the future", () => {
		const isoDate = new Date(fixedNow.getTime() + 30 * 1000).toISOString();

		const formattedTimeAgo = timeAgo(isoDate, fixedNow);

		expect(formattedTimeAgo).toBe("just now");
	});

	it("should be able to format one minute ago using the singular label", () => {
		const isoDate = new Date(fixedNow.getTime() - 60 * 1000).toISOString();

		const formattedTimeAgo = timeAgo(isoDate, fixedNow);

		expect(formattedTimeAgo).toBe("1 minute ago");
	});

	it("should be able to format multiple hours ago using the plural label", () => {
		const isoDate = new Date(
			fixedNow.getTime() - 2 * 60 * 60 * 1000,
		).toISOString();

		const formattedTimeAgo = timeAgo(isoDate, fixedNow);

		expect(formattedTimeAgo).toBe("2 hours ago");
	});

	it("should be able to format multiple days ago using the plural label", () => {
		const isoDate = new Date(
			fixedNow.getTime() - 3 * 24 * 60 * 60 * 1000,
		).toISOString();

		const formattedTimeAgo = timeAgo(isoDate, fixedNow);

		expect(formattedTimeAgo).toBe("3 days ago");
	});

	it("should be able to format one week ago using the singular label", () => {
		const isoDate = new Date(
			fixedNow.getTime() - 7 * 24 * 60 * 60 * 1000,
		).toISOString();

		const formattedTimeAgo = timeAgo(isoDate, fixedNow);

		expect(formattedTimeAgo).toBe("1 week ago");
	});

	it("should be able to format multiple months ago using the plural label", () => {
		const isoDate = new Date(
			fixedNow.getTime() - 3 * 30 * 24 * 60 * 60 * 1000,
		).toISOString();

		const formattedTimeAgo = timeAgo(isoDate, fixedNow);

		expect(formattedTimeAgo).toBe("3 months ago");
	});

	it("should be able to format multiple years ago using the plural label", () => {
		const isoDate = new Date(
			fixedNow.getTime() - 2 * 365 * 24 * 60 * 60 * 1000,
		).toISOString();

		const formattedTimeAgo = timeAgo(isoDate, fixedNow);

		expect(formattedTimeAgo).toBe("2 years ago");
	});
});
