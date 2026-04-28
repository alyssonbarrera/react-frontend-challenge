import { render, screen } from "@tests/utils";
import { Player } from "./player";

type RenderPlayerOptions = {
	title?: string;
	youtubeKey?: string;
};

function renderPlayer(options?: RenderPlayerOptions) {
	return render(
		<Player
			youtubeKey={options?.youtubeKey ?? "dQw4w9WgXcQ"}
			title={options?.title}
		/>,
	);
}

describe("Player", () => {
	it("should be able to render player iframe with source and important attributes", () => {
		const youtubeKey = "abc123XYZ";

		renderPlayer({ youtubeKey });

		const playerContainer = screen.getByTestId("player");
		const playerIframe = screen.getByTestId("player-iframe");

		expect(playerContainer).toBeDefined();
		expect(playerIframe).toBeDefined();

		expect(playerIframe.getAttribute("src")).toBe(
			`https://www.youtube-nocookie.com/embed/${youtubeKey}`,
		);

		expect(playerIframe.getAttribute("loading")).toBe("lazy");
		expect(playerIframe.getAttribute("referrerpolicy")).toBe(
			"strict-origin-when-cross-origin",
		);
		expect((playerIframe as HTMLIFrameElement).allowFullscreen).toBe(true);
	});

	it("should be able to use fallback and custom title in iframe", () => {
		const youtubeKey = "abc123XYZ";
		const customTitle = "Official Trailer";
		const { rerender } = renderPlayer({ youtubeKey });

		const playerIframeFallbackTitle = screen.getByTestId("player-iframe");

		expect(playerIframeFallbackTitle.getAttribute("title")).toBe(
			"Video player",
		);

		rerender(<Player youtubeKey={youtubeKey} title={customTitle} />);

		const playerIframeCustomTitle = screen.getByTestId("player-iframe");

		expect(playerIframeCustomTitle.getAttribute("title")).toBe(customTitle);
	});
});
