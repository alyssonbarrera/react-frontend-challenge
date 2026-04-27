import { loginSchema } from "./login.schema";

describe("loginSchema", () => {
	it("should not be able to validate password with 5 characters", async () => {
		const loginSchemaValidationResult = loginSchema.safeParse({
			email: "john.doe@cinedash.app",
			password: "12345",
		});

		expect(loginSchemaValidationResult.success).toBe(false);
	});

	it("should be able to validate password with 6 characters", async () => {
		const loginSchemaValidationResult = loginSchema.safeParse({
			email: "john.doe@cinedash.app",
			password: "123456",
		});

		expect(loginSchemaValidationResult.success).toBe(true);
	});

	it("should not be able to validate when the email is malformed", async () => {
		const loginSchemaValidationResult = loginSchema.safeParse({
			email: "not-an-email",
			password: "1234567",
		});

		const emailIssue = loginSchemaValidationResult.error?.issues.find((issue) =>
			issue.path.includes("email"),
		);

		expect(loginSchemaValidationResult.success).toBe(false);
		expect(emailIssue?.message).toBe("Please enter a valid email.");
	});

	it("should not be able to validate when the email is empty", async () => {
		const loginSchemaValidationResult = loginSchema.safeParse({
			email: "",
			password: "1234567",
		});

		const emailIssue = loginSchemaValidationResult.error?.issues.find((issue) =>
			issue.path.includes("email"),
		);

		expect(loginSchemaValidationResult.success).toBe(false);
		expect(emailIssue).toBeDefined();
	});

	it("should not be able to validate when both email and password are empty", async () => {
		const loginSchemaValidationResult = loginSchema.safeParse({
			email: "",
			password: "",
		});

		const issuePaths = loginSchemaValidationResult.error?.issues.map((issue) =>
			issue.path.join("."),
		);

		expect(loginSchemaValidationResult.success).toBe(false);
		expect(issuePaths).toContain("email");
		expect(issuePaths).toContain("password");
	});
});
