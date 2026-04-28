import { loginWithCredentialsRequest } from "./login-with-credentials-request";

describe("loginWithCredentialsRequest", () => {
	it("should be able to login with valid credentials", async () => {
		const email = "john.doe@cinedash.app";

		const loginWithCredentialsRequestResponse =
			await loginWithCredentialsRequest({
				email,
				password: "12345678",
			});

		expect(loginWithCredentialsRequestResponse.token).toBeTypeOf("string");
		expect(loginWithCredentialsRequestResponse.user.id).toBeTypeOf("string");
		expect(loginWithCredentialsRequestResponse.user.name).toBe("John Doe");
		expect(loginWithCredentialsRequestResponse.user.email).toBe(email);
	});

	it("should not be able to login with missing credentials", async () => {
		const loginWithCredentialsRequestPromise = loginWithCredentialsRequest({
			email: "",
			password: "12345678",
		});

		await expect(loginWithCredentialsRequestPromise).rejects.toThrow(
			"Invalid credentials.",
		);
	});
});
