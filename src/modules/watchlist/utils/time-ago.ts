const SECOND_IN_MS = 1000;
const MINUTE_IN_MS = 60 * SECOND_IN_MS;
const HOUR_IN_MS = 60 * MINUTE_IN_MS;
const DAY_IN_MS = 24 * HOUR_IN_MS;
const WEEK_IN_MS = 7 * DAY_IN_MS;
const MONTH_IN_MS = 30 * DAY_IN_MS;
const YEAR_IN_MS = 365 * DAY_IN_MS;

export function timeAgo(isoDate: string, now: Date = new Date()): string {
	const past = new Date(isoDate).getTime();
	const diff = now.getTime() - past;

	if (Number.isNaN(past) || diff < MINUTE_IN_MS) {
		return "just now";
	}

	if (diff < HOUR_IN_MS) {
		const minutes = Math.floor(diff / MINUTE_IN_MS);
		return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
	}

	if (diff < DAY_IN_MS) {
		const hours = Math.floor(diff / HOUR_IN_MS);
		return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
	}

	if (diff < WEEK_IN_MS) {
		const days = Math.floor(diff / DAY_IN_MS);
		return `${days} ${days === 1 ? "day" : "days"} ago`;
	}

	if (diff < MONTH_IN_MS) {
		const weeks = Math.floor(diff / WEEK_IN_MS);
		return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
	}

	if (diff < YEAR_IN_MS) {
		const months = Math.floor(diff / MONTH_IN_MS);
		return `${months} ${months === 1 ? "month" : "months"} ago`;
	}

	const years = Math.floor(diff / YEAR_IN_MS);
	return `${years} ${years === 1 ? "year" : "years"} ago`;
}
