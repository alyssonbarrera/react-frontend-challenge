import { render, screen } from "@tests/utils";
import { Compass, Flame, Heart } from "lucide-react";
import type React from "react";
import { SidebarProvider } from "@/core/components/ui/sidebar";
import { NavMain } from "./nav-main";

vi.mock("@/core/hooks/use-mobile", () => ({
	useIsMobile: () => false,
}));

vi.mock("@tanstack/react-router", async (importOriginal) => {
	const actual =
		await importOriginal<typeof import("@tanstack/react-router")>();
	const navigateMock = vi.fn();

	return {
		...actual,
		useNavigate: () => navigateMock,
		Link: ({
			to,
			children,
			...props
		}: {
			to: string;
			children: React.ReactNode;
		} & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
			<a href={to} {...props}>
				{children}
			</a>
		),
		useLocation: ({
			select,
		}: {
			select: (location: { pathname: string }) => string;
		}) => select({ pathname: "/discovery" }),
	};
});

const navMainSections = [
	{
		label: "BROWSE",
		items: [
			{
				title: "Discover",
				url: "/discovery",
				activePath: "/discovery",
				icon: Compass,
			},
			{
				title: "Trending",
				url: "/design-system",
				activePath: "/trending",
				icon: Flame,
			},
		],
	},
	{
		label: "LIBRARY",
		items: [
			{
				title: "Favorites",
				url: "/watchlist",
				activePath: "/watchlist",
				icon: Heart,
				badge: "12",
			},
		],
	},
];

describe("NavMain", () => {
	it("should be able to render sections items and badges", () => {
		render(
			<SidebarProvider>
				<NavMain sections={navMainSections} />
			</SidebarProvider>,
		);

		const navMainSectionBrowseLabel = screen.getByTestId(
			"nav-main-section-0-label",
		);
		const navMainSectionLibraryLabel = screen.getByTestId(
			"nav-main-section-1-label",
		);
		const navMainItemDiscoverButton = screen.getByTestId(
			"nav-main-item-0-0-button",
		);
		const navMainItemTrendingButton = screen.getByTestId(
			"nav-main-item-0-1-button",
		);
		const navMainItemFavoritesBadge = screen.getByTestId(
			"nav-main-item-1-0-badge",
		);

		expect(navMainSectionBrowseLabel.textContent).toBe("BROWSE");
		expect(navMainSectionLibraryLabel.textContent).toBe("LIBRARY");
		expect(navMainItemDiscoverButton).toBeDefined();
		expect(navMainItemTrendingButton).toBeDefined();
		expect(navMainItemFavoritesBadge.textContent).toBe("12");
	});

	it("should be able to expose active state and links for each item", () => {
		render(
			<SidebarProvider>
				<NavMain sections={navMainSections} />
			</SidebarProvider>,
		);

		const navMainItemDiscoverButton = screen.getByTestId(
			"nav-main-item-0-0-button",
		);
		const navMainItemTrendingButton = screen.getByTestId(
			"nav-main-item-0-1-button",
		);
		const navMainItemFavoritesButton = screen.getByTestId(
			"nav-main-item-1-0-button",
		);

		expect(navMainItemDiscoverButton.getAttribute("data-active")).toBe("true");
		expect(navMainItemTrendingButton.getAttribute("data-active")).toBe("false");
		expect(navMainItemDiscoverButton.getAttribute("href")).toBe("/discovery");
		expect(navMainItemTrendingButton.getAttribute("href")).toBe(
			"/design-system",
		);
		expect(navMainItemFavoritesButton.getAttribute("href")).toBe("/watchlist");
	});
});
