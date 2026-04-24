import { fireEvent, render, screen } from "@testing-library/react";
import { makeUseForm } from "@tests/factories/make-use-form";
import { type LoginSchema, loginSchema } from "../../schemas/login.schema";
import { LoginForm } from "./login-form";
import { useLoginForm } from "./login-form.hook";

vi.mock("./login-form.hook");

type MakeUseLoginFormOverrides = {
	isPending?: boolean;
	onForgotPassword?: VoidFunction;
	onCreateAccount?: VoidFunction;
	onSubmit?: (values: LoginSchema) => void;
	onSocialLogin?: (provider: "google" | "apple" | "github") => void;
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
		onSocialLogin: overrides?.onSocialLogin ?? vi.fn(),
		onForgotPassword: overrides?.onForgotPassword ?? vi.fn(),
		onCreateAccount: overrides?.onCreateAccount ?? vi.fn(),
	};
}

describe("LoginForm", () => {
	let onSocialLoginMock: ReturnType<typeof vi.fn>;
	let onForgotPasswordMock: ReturnType<typeof vi.fn>;
	let onCreateAccountMock: ReturnType<typeof vi.fn>;
	let defaultUseLoginFormMock: ReturnType<typeof useLoginForm>;

	beforeEach(() => {
		const loginFormUseFormResult = makeUseForm<LoginSchema>(loginSchema, {
			defaultValues: loginFormDefaultValues,
		});

		onSocialLoginMock = vi.fn();
		onForgotPasswordMock = vi.fn();
		onCreateAccountMock = vi.fn();

		defaultUseLoginFormMock = makeUseLoginForm(loginFormUseFormResult, {
			onSocialLogin: onSocialLoginMock,
			onForgotPassword: onForgotPasswordMock,
			onCreateAccount: onCreateAccountMock,
		});

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

	it("should be able to call social login when google button is clicked", () => {
		render(<LoginForm />);

		const loginFormGoogleButton = screen.getByTestId(
			"login-form-google-button",
		);

		fireEvent.click(loginFormGoogleButton);

		expect(onSocialLoginMock).toHaveBeenCalled();
		expect(onSocialLoginMock).toHaveBeenCalledTimes(1);
		expect(onSocialLoginMock).toHaveBeenCalledWith("google");
	});

	it("should be able to call forgot password when forgot button is clicked", () => {
		render(<LoginForm />);

		const loginFormForgotButton = screen.getByTestId(
			"login-form-forgot-button",
		);

		fireEvent.click(loginFormForgotButton);

		expect(onForgotPasswordMock).toHaveBeenCalled();
		expect(onForgotPasswordMock).toHaveBeenCalledTimes(1);
	});

	it("should be able to call create account when signup button is clicked", () => {
		render(<LoginForm />);

		const loginFormSignupButton = screen.getByTestId(
			"login-form-signup-button",
		);

		fireEvent.click(loginFormSignupButton);

		expect(onCreateAccountMock).toHaveBeenCalled();
		expect(onCreateAccountMock).toHaveBeenCalledTimes(1);
	});
});
