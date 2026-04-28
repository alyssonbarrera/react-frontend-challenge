import { fireEvent, render, screen } from "@tests/utils";
import { SidebarProvider } from "@/core/components/ui/sidebar";
import { AuthenticatedLayoutHeader } from "./authenticated-layout-header";

vi.mock("@/core/hooks/use-mobile", () => ({
	useIsMobile: () => false,
}));

function renderHeader() {
	return render(
		<SidebarProvider>
			<AuthenticatedLayoutHeader />
		</SidebarProvider>,
	);
}

describe("AuthenticatedLayoutHeader", () => {
	it("should be able to render the header trigger and search input", () => {
		renderHeader();

		const authenticatedLayoutHeader = screen.getByTestId(
			"authenticated-layout-header",
		);
		const authenticatedLayoutHeaderSidebarTrigger = screen.getByTestId(
			"authenticated-layout-header-sidebar-trigger",
		);
		const authenticatedLayoutHeaderSearchInput = screen.getByTestId(
			"global-search-input",
		);
		const authenticatedLayoutHeaderSpacer = screen.getByTestId(
			"authenticated-layout-header-spacer",
		);

		expect(authenticatedLayoutHeader).toBeDefined();
		expect(authenticatedLayoutHeaderSidebarTrigger).toBeDefined();
		expect(authenticatedLayoutHeaderSearchInput).toBeDefined();
		expect(authenticatedLayoutHeaderSpacer).toBeDefined();
	});

	it("should be able to toggle the sidebar state when trigger is clicked", () => {
		renderHeader();

		const authenticatedLayoutHeaderSidebarTrigger = screen.getByTestId(
			"authenticated-layout-header-sidebar-trigger",
		);

		fireEvent.click(authenticatedLayoutHeaderSidebarTrigger);

		expect(document.cookie).toContain("sidebar_state=false");
	});
});
