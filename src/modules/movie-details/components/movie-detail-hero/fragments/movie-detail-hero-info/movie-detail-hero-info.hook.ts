import { useNavigate } from "@tanstack/react-router";

export function useMovieDetailHeroInfo() {
	const navigate = useNavigate();

	function handleBackToDiscover() {
		navigate({ to: "/discovery" });
	}

	return { handleBackToDiscover };
}
