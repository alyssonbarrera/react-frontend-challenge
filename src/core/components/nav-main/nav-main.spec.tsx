import { tanstackRouterMock } from "@tests/factories/make-tanstack-router";
import { fireEvent, render, screen } from "@tests/utils";
import { Compass, Flame, Heart } from "lucide-react";
import { SidebarProvider, useSidebar } from "@/core/components/ui/sidebar";
import { NavMain } from "./nav-main";

const { useIsMobileMock } = vi.hoisted(() => ({
	useIsMobileMock: vi.fn(() => false),
}));

vi.mock("@/core/hooks/use-mobile", () => ({
	useIsMobile: useIsMobileMock,
}));

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
	beforeEach(() => {
		tanstackRouterMock.setPathname("/discovery");
		useIsMobileMock.mockReturnValue(false);
	});

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

	it("should be able to close mobile sidebar when clicking on a navigation item", () => {
		useIsMobileMock.mockReturnValue(true);

		render(
			<SidebarProvider>
				<MobileSidebarState />
				<NavMain sections={navMainSections} />
			</SidebarProvider>,
		);

		const mobileSidebarOpenButton = screen.getByTestId(
			"mobile-sidebar-open-button",
		);
		const navMainItemDiscoverButton = screen.getByTestId(
			"nav-main-item-0-0-button",
		);
		const mobileSidebarOpenState = screen.getByTestId("mobile-sidebar-open");

		expect(mobileSidebarOpenState.textContent).toBe("false");

		fireEvent.click(mobileSidebarOpenButton);
		expect(mobileSidebarOpenState.textContent).toBe("true");

		fireEvent.click(navMainItemDiscoverButton);
		expect(mobileSidebarOpenState.textContent).toBe("false");
	});
});

function MobileSidebarState() {
	const { openMobile, setOpenMobile } = useSidebar();

	return (
		<div>
			<button
				type="button"
				data-testid="mobile-sidebar-open-button"
				onClick={() => setOpenMobile(true)}
			>
				Open mobile sidebar
			</button>
			<span data-testid="mobile-sidebar-open">{String(openMobile)}</span>
		</div>
	);
}
