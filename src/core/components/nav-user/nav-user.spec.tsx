import { makeUser } from "@tests/factories/make-user";
import { fireEvent, render, screen } from "@tests/utils";
import { SidebarProvider } from "@/core/components/ui/sidebar";
import { NavUser } from "./nav-user";

vi.mock("@/core/hooks/use-mobile", () => ({
	useIsMobile: () => false,
}));

const navUserUser = makeUser({
	name: "Alex Morgan",
	email: "alex.morgan@cinedash.app",
});

describe("NavUser", () => {
	it("should be able to render user identity in the trigger", () => {
		render(
			<SidebarProvider>
				<NavUser user={navUserUser} />
			</SidebarProvider>,
		);

		const navUserMenu = screen.getByTestId("nav-user-menu");
		const navUserTrigger = screen.getByTestId("nav-user-trigger");
		const navUserIdentity = screen.getByTestId("nav-user-identity");
		const navUserName = screen.getByTestId("nav-user-name");
		const navUserEmail = screen.getByTestId("nav-user-email");

		expect(navUserMenu).toBeDefined();
		expect(navUserTrigger).toBeDefined();
		expect(navUserIdentity).toBeDefined();
		expect(navUserName.textContent).toBe("Alex Morgan");
		expect(navUserEmail.textContent).toBe("alex.morgan@cinedash.app");
	});

	it("should be able to open dropdown menu and show logout item", async () => {
		render(
			<SidebarProvider>
				<NavUser user={navUserUser} />
			</SidebarProvider>,
		);

		const navUserTrigger = screen.getByTestId("nav-user-trigger");

		fireEvent.pointerDown(navUserTrigger, {
			button: 0,
			ctrlKey: false,
		});

		const navUserDropdownContent = await screen.findByTestId(
			"nav-user-dropdown-content",
		);
		const navUserLogoutItem = await screen.findByTestId("nav-user-logout-item");

		expect(navUserDropdownContent).toBeDefined();
		expect(navUserLogoutItem).toBeDefined();
	});
});
