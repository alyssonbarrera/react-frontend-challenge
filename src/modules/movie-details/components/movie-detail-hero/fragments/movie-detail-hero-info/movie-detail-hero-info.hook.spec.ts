import { useNavigate } from "@tanstack/react-router";
import { act, renderHook } from "@tests/utils";
import { useMovieDetailHeroInfo } from "./movie-detail-hero-info.hook";

describe("useMovieDetailHeroInfo", () => {
	let navigateMock: ReturnType<typeof vi.fn>;

	beforeEach(() => {
		navigateMock = vi.fn();
		vi.mocked(useNavigate).mockReturnValue(navigateMock as never);
	});

	it("should be able to navigate back to discover", () => {
		const { result } = renderHook(() => useMovieDetailHeroInfo());

		act(() => {
			result.current.handleBackToDiscover();
		});

		expect(navigateMock).toHaveBeenCalledWith({ to: "/discovery" });
		expect(navigateMock).toHaveBeenCalledTimes(1);
	});
});
