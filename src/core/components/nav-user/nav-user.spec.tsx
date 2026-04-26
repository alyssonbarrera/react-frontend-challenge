import { tanstackRouterMock } from "@tests/factories/make-tanstack-router";
import { makeUser } from "@tests/factories/make-user";
import { fireEvent, render, screen } from "@tests/utils";
import { SidebarProvider } from "@/core/components/ui/sidebar";
import { NavUser } from "./nav-user";

const navUserNavigateMock = vi.fn();
const navUserClearAuthMock = vi.fn();
const navUserSetThemeMock = vi.fn();
let navUserTheme: "light" | "dark" = "dark";

vi.mock("@/core/hooks/use-mobile", () => ({
	useIsMobile: () => false,
}));

vi.mock("@/core/stores/auth-store", () => ({
	useAuthStore: (selector: (state: { clearAuth: VoidFunction }) => unknown) =>
		selector({ clearAuth: navUserClearAuthMock }),
}));

vi.mock("@/core/stores/theme-store", () => ({
	useThemeStore: (
		selector: (state: {
			theme: "light" | "dark";
			setTheme: (theme: "light" | "dark") => void;
		}) => unknown,
	) =>
		selector({
			theme: navUserTheme,
			setTheme: navUserSetThemeMock,
		}),
}));

const navUserUser = makeUser({
	name: "Alex Morgan",
	email: "alex.morgan@cinedash.app",
});

describe("NavUser", () => {
	beforeEach(() => {
		navUserTheme = "dark";
		tanstackRouterMock.setNavigateMock(navUserNavigateMock);
	});

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

	it("should be able to open dropdown menu and show logout item", () => {
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

		const navUserDropdownContent = screen.getByTestId(
			"nav-user-dropdown-content",
		);
		const navUserThemeItem = screen.getByTestId("nav-user-theme-item");
		const navUserThemeToggle = screen.getByTestId("nav-user-theme-toggle");
		const navUserLogoutItem = screen.getByTestId("nav-user-logout-item");

		expect(navUserDropdownContent).toBeDefined();
		expect(navUserThemeItem).toBeDefined();
		expect(navUserThemeToggle).toBeDefined();
		expect(navUserLogoutItem).toBeDefined();
	});

	it("should be able to set light theme when toggle is turned off", () => {
		navUserTheme = "dark";

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

		const navUserThemeToggle = screen.getByTestId("nav-user-theme-toggle");

		fireEvent.click(navUserThemeToggle);

		expect(navUserSetThemeMock).toHaveBeenCalledWith("light");
	});

	it("should be able to logout and redirect to login page", () => {
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

		const navUserLogoutItem = screen.getByTestId("nav-user-logout-item");

		fireEvent.click(navUserLogoutItem);

		expect(navUserClearAuthMock).toHaveBeenCalledTimes(1);
		expect(navUserNavigateMock).toHaveBeenCalledWith({ to: "/" });
	});
});
