import { render, screen } from "@tests/utils";
import { SidebarProvider } from "@/core/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";

vi.mock("@/core/hooks/use-mobile", () => ({
	useIsMobile: () => false,
}));

describe("AppSidebar", () => {
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
});
