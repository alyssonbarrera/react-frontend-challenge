import { loginSchema } from "./login.schema";

describe("loginSchema", () => {
	it("should not be able to validate password with 6 characters", async () => {
		const loginSchemaValidationResult = loginSchema.safeParse({
			email: "john.doe@cinedash.app",
			password: "123456",
		});

		expect(loginSchemaValidationResult.success).toBe(false);
	});

	it("should be able to validate password with 7 characters", async () => {
		const loginSchemaValidationResult = loginSchema.safeParse({
			email: "john.doe@cinedash.app",
			password: "1234567",
		});

		expect(loginSchemaValidationResult.success).toBe(true);
	});
});
