import { render, screen } from "@tests/utils";
import { LoginScreen } from "./login-screen";

describe("LoginScreen", () => {
	it("should be able to render screen elements", () => {
		render(<LoginScreen />);

		const loginScreen = screen.getByTestId("login-screen");
		const loginScreenLoginForm = screen.getByTestId("login-form");

		expect(loginScreen).toBeDefined();
		expect(loginScreenLoginForm).toBeDefined();
	});
});
