type UseMovieDetailBodyParams = {
	id: string;
};

type CastMember = {
	id: string;
	name: string;
	role: string;
};

type ScoreBreakdownItem = {
	label: string;
	value: number;
	tone: "cyan" | "amber";
};

type CrewMember = {
	role: string;
	name: string;
};

type StreamingOption = {
	id: string;
	label: string;
	icon: "play" | "download" | "shopping-bag";
};

export type MovieDetailBodyData = {
	synopsis: string;
	cast: ReadonlyArray<CastMember>;
	trailer: {
		title: string;
		quality: string;
		duration: string;
	};
	audienceScore: {
		score: number;
		max: number;
		votes: number;
		breakdown: ReadonlyArray<ScoreBreakdownItem>;
	};
	keyCrew: ReadonlyArray<CrewMember>;
	whereToWatch: {
		region: string;
		options: ReadonlyArray<StreamingOption>;
		footnote: string;
	};
};

const MOCK_BODY: MovieDetailBodyData = {
	synopsis:
		"On a remote island where the sea remembers more than the people, a lighthouse keeper inherits a journal that begins to rewrite his memories. As fog thickens around the cliffs and a young cartographer arrives with questions she can't quite name, the line between what was lost and what was hidden quietly dissolves.",
	cast: [
		{ id: "c1", name: "Iris Halvorsen", role: "Mira" },
		{ id: "c2", name: "Tomás Reyes", role: "The Keeper" },
		{ id: "c3", name: "Maren Holst", role: "Eli" },
		{ id: "c4", name: "Aki Solberg", role: "Halvar" },
	],
	trailer: {
		title: "Quiet Horizon — Official Teaser",
		quality: "4K · HDR",
		duration: "2:14",
	},
	audienceScore: {
		score: 8.7,
		max: 10,
		votes: 12_840,
		breakdown: [
			{ label: "Story", value: 9.1, tone: "cyan" },
			{ label: "Acting", value: 8.6, tone: "cyan" },
			{ label: "Visuals", value: 9.4, tone: "cyan" },
			{ label: "Pacing", value: 7.4, tone: "amber" },
		],
	},
	keyCrew: [
		{ role: "Director", name: "Lena Marquez" },
		{ role: "Screenplay", name: "Lena Marquez, Yuki Tanaka" },
		{ role: "Cinematography", name: "Anders Holm" },
		{ role: "Score", name: "Hildur Reyk" },
		{ role: "Editor", name: "Marco Vidal" },
	],
	whereToWatch: {
		region: "US",
		options: [
			{ id: "stream", label: "Stream", icon: "play" },
			{ id: "rent", label: "Rent · $4.99", icon: "download" },
			{ id: "buy", label: "Buy · $14.99", icon: "shopping-bag" },
		],
		footnote: "Available on 4 platforms in your region.",
	},
};

const PERCENTAGE_FROM_SCORE = 10;

export function useMovieDetailBody(_params: UseMovieDetailBodyParams) {
	const body = MOCK_BODY;

	const formattedScore = body.audienceScore.score.toFixed(1);
	const formattedScoreMax = `/ ${body.audienceScore.max}`;
	const formattedVotes = `${body.audienceScore.votes.toLocaleString("en-US")} votes`;
	const scoreBreakdown = body.audienceScore.breakdown.map((item) => ({
		...item,
		percentage: item.value * PERCENTAGE_FROM_SCORE,
		formattedValue: item.value.toFixed(1),
	}));

	function handlePlayTrailer() {
		// Placeholder for the trailer modal trigger.
	}

	function handleSelectStreamingOption(_optionId: string) {
		// Placeholder for streaming deep link.
	}

	return {
		body,
		formattedScore,
		formattedScoreMax,
		formattedVotes,
		scoreBreakdown,
		handlePlayTrailer,
		handleSelectStreamingOption,
	};
}
