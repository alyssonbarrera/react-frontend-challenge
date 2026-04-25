import { makeMovie } from "@tests/mocks/factories/make-movie";
import { render, screen } from "@tests/utils";
import type React from "react";
import { SidebarProvider } from "@/core/components/ui/sidebar";
import { useWatchlistStore } from "@/modules/watchlist/stores/watchlist-store";
import { AppSidebar } from "./app-sidebar";

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

const initialWatchlistState = useWatchlistStore.getState();

describe("AppSidebar", () => {
	beforeEach(() => {
		useWatchlistStore.setState(initialWatchlistState);
		localStorage.clear();
	});

	it("should be able to render sidebar structure and brand", () => {
		render(
			<SidebarProvider>
				<AppSidebar />
			</SidebarProvider>,
		);

		const appSidebar = screen.getByTestId("app-sidebar");
		const appSidebarBrand = screen.getByTestId("app-sidebar-brand");
		const appSidebarBrandTitle = screen.getByTestId("app-sidebar-brand-title");
		const appSidebarContent = screen.getByTestId("app-sidebar-content");
		const appSidebarFooter = screen.getByTestId("app-sidebar-footer");
		const appSidebarRail = screen.getByTestId("app-sidebar-rail");

		expect(appSidebar).toBeDefined();
		expect(appSidebarBrand).toBeDefined();
		expect(appSidebarBrandTitle.textContent).toBe("CineDash");
		expect(appSidebarContent).toBeDefined();
		expect(appSidebarFooter).toBeDefined();
		expect(appSidebarRail).toBeDefined();
	});

	it("should be able to render default navigation sections and user menu", () => {
		render(
			<SidebarProvider>
				<AppSidebar />
			</SidebarProvider>,
		);

		const appSidebarBrowseLabel = screen.getByTestId(
			"nav-main-section-0-label",
		);
		const appSidebarLibraryLabel = screen.getByTestId(
			"nav-main-section-1-label",
		);
		const appSidebarUserMenu = screen.getByTestId("nav-user-menu");
		const appSidebarUserTrigger = screen.getByTestId("nav-user-trigger");

		expect(appSidebarBrowseLabel.textContent).toBe("BROWSE");
		expect(appSidebarLibraryLabel.textContent).toBe("LIBRARY");
		expect(appSidebarUserMenu).toBeDefined();
		expect(appSidebarUserTrigger).toBeDefined();
	});

	it("should be able to render watchlist badge from real store count", () => {
		useWatchlistStore.setState({
			items: [
				{ ...makeMovie({ id: 1 }), addedAt: "2026-01-01T00:00:00.000Z" },
				{ ...makeMovie({ id: 2 }), addedAt: "2026-01-02T00:00:00.000Z" },
			],
		});

		render(
			<SidebarProvider>
				<AppSidebar />
			</SidebarProvider>,
		);

		const watchlistBadge = screen.getByTestId("nav-main-item-1-0-badge");

		expect(watchlistBadge.textContent).toBe("2");
	});
});
