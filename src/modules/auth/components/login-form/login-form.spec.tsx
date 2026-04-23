import { fireEvent, render, screen } from "@testing-library/react";
import { makeUseForm } from "@tests/factories/make-use-form";
import { describe, expect, it, vi } from "vitest";
import { type LoginSchema, loginSchema } from "../../schemas/login-schema";
import { LoginForm } from "./login-form";
import { useLoginForm } from "./login-form.hook";

vi.mock("./login-form.hook");

type MakeUseLoginFormOverrides = {
	isPending?: boolean;
	onSubmit?: (values: LoginSchema) => void;
	onSocialSignIn?: (provider: "google" | "apple" | "github") => void;
};

const loginFormDefaultValues: LoginSchema = {
	email: "",
	password: "",
};

function makeUseLoginForm(
	loginFormUseFormResult: ReturnType<typeof makeUseForm<LoginSchema>>,
	overrides?: MakeUseLoginFormOverrides,
) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = loginFormUseFormResult.result.current;

	return {
		errors,
		register,
		handleSubmit,
		onSubmit: overrides?.onSubmit ?? vi.fn(),
		isPending: overrides?.isPending ?? false,
		onSocialSignIn: overrides?.onSocialSignIn ?? vi.fn(),
	};
}

describe("LoginForm", () => {
	let defaultUseLoginFormMock: ReturnType<typeof useLoginForm>;

	beforeEach(() => {
		const loginFormUseFormResult = makeUseForm<LoginSchema>(loginSchema, {
			defaultValues: loginFormDefaultValues,
		});

		defaultUseLoginFormMock = makeUseLoginForm(loginFormUseFormResult);
		vi.mocked(useLoginForm).mockReturnValue(defaultUseLoginFormMock);
	});

	it("should be able to render login form fields", () => {
		render(<LoginForm />);

		const loginForm = screen.getByTestId("login-form");
		const loginFormEmailInput = screen.getByTestId("login-form-email-input");
		const loginFormPasswordInput = screen.getByTestId(
			"login-form-password-input",
		);
		const loginFormSubmitButton = screen.getByTestId(
			"login-form-submit-button",
		);

		expect(loginForm).toBeTruthy();
		expect(loginFormEmailInput).toBeTruthy();
		expect(loginFormPasswordInput).toBeTruthy();
		expect(loginFormSubmitButton).toBeTruthy();
	});

	it("should be able to call social sign in when google button is clicked", () => {
		const onSocialSignIn = vi.fn();
		const loginFormUseFormResult = makeUseForm<LoginSchema>(loginSchema, {
			defaultValues: loginFormDefaultValues,
		});
		const useLoginFormMock = makeUseLoginForm(loginFormUseFormResult, {
			onSocialSignIn,
		});
		vi.mocked(useLoginForm).mockReturnValue(useLoginFormMock);

		render(<LoginForm />);

		const loginFormGoogleButton = screen.getByTestId(
			"login-form-google-button",
		);

		fireEvent.click(loginFormGoogleButton);

		expect(onSocialSignIn).toHaveBeenCalled();
		expect(onSocialSignIn).toHaveBeenCalledTimes(1);
		expect(onSocialSignIn).toHaveBeenCalledWith("google");
	});
});
