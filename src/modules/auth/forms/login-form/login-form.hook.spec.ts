import { useNavigate } from "@tanstack/react-router";
import { makeUser } from "@tests/factories/make-user";
import { act, renderHook, waitFor } from "@tests/utils";
import { toast } from "sonner";
import type { MockInstance } from "vitest";
import { useAuthStore } from "@/core/stores/auth-store";
import type { LoginWithCredentialsRequestResponse } from "../../http/login-with-credentials-request";
import * as loginWithCredentialsRequestModule from "../../http/login-with-credentials-request";
import { useLoginForm } from "./login-form.hook";

vi.mock("sonner", () => ({
	toast: {
		info: vi.fn(),
		error: vi.fn(),
	},
}));

vi.mock("@tanstack/react-router", async () => ({
	...(await vi.importActual("@tanstack/react-router")),
	useNavigate: vi.fn(),
}));

const user = makeUser();
const token = "test-token";

const loginCredentials = {
	email: user.email,
	password: "12345678",
};

describe("useLoginForm", () => {
	const setAuth = vi.fn();
	const navigate = vi.fn();
	let loginWithCredentialsRequestSpy: MockInstance;

	beforeEach(() => {
		vi.mocked(useNavigate).mockReturnValue(navigate as never);
		vi.mocked(useAuthStore).mockImplementation((selector) => {
			return selector({ setAuth } as never);
		});

		loginWithCredentialsRequestSpy = vi.spyOn(
			loginWithCredentialsRequestModule,
			"loginWithCredentialsRequest",
		);
	});

	it("should be able to submit credentials with email and password", async () => {
		loginWithCredentialsRequestSpy.mockResolvedValue({ token, user });

		const { result } = renderHook(() => useLoginForm());

		act(() => {
			result.current.onSubmit(loginCredentials);
		});

		await waitFor(() => {
			expect(loginWithCredentialsRequestSpy).toHaveBeenCalled();
			expect(loginWithCredentialsRequestSpy).toHaveBeenCalledTimes(1);
			expect(loginWithCredentialsRequestSpy).toHaveBeenCalledWith(
				loginCredentials,
			);
		});
	});

	it("should be able to handle success callback in login form hook", async () => {
		loginWithCredentialsRequestSpy.mockResolvedValue({ token, user });

		const { result } = renderHook(() => useLoginForm());

		act(() => {
			result.current.onSubmit(loginCredentials);
		});

		await waitFor(() => {
			expect(loginWithCredentialsRequestSpy).toHaveBeenCalled();
			expect(loginWithCredentialsRequestSpy).toHaveBeenCalledTimes(1);
			expect(loginWithCredentialsRequestSpy).toHaveBeenCalledWith(
				loginCredentials,
			);
		});

		await waitFor(() => {
			expect(setAuth).toHaveBeenCalled();
			expect(setAuth).toHaveBeenCalledTimes(1);
			expect(setAuth).toHaveBeenCalledWith({
				token,
				user,
			});
		});

		await waitFor(() => {
			expect(navigate).toHaveBeenCalled();
			expect(navigate).toHaveBeenCalledTimes(1);
			expect(navigate).toHaveBeenCalledWith({ to: "/app" });
		});
	});

	it("should be able to handle error callback in login form hook", async () => {
		loginWithCredentialsRequestSpy.mockRejectedValue(
			new Error("Unable to login."),
		);

		const { result } = renderHook(() => useLoginForm());

		act(() => {
			result.current.onSubmit(loginCredentials);
		});

		await waitFor(() => {
			expect(loginWithCredentialsRequestSpy).toHaveBeenCalled();
			expect(loginWithCredentialsRequestSpy).toHaveBeenCalledTimes(1);
		});

		await waitFor(() => {
			expect(toast.error).toHaveBeenCalled();
			expect(toast.error).toHaveBeenCalledTimes(1);
			expect(toast.error).toHaveBeenCalledWith("Unable to login.", {
				description: "Please try again shortly.",
			});
		});

		expect(setAuth).not.toHaveBeenCalled();
		expect(navigate).not.toHaveBeenCalled();
	});

	it("should be able to expose pending state from login mutation", async () => {
		let resolveRequest:
			| ((value: LoginWithCredentialsRequestResponse) => void)
			| undefined;

		const pendingRequestPromise =
			new Promise<LoginWithCredentialsRequestResponse>((resolve) => {
				resolveRequest = resolve;
			});

		loginWithCredentialsRequestSpy.mockReturnValue(pendingRequestPromise);

		const { result } = renderHook(() => useLoginForm());

		act(() => {
			result.current.onSubmit(loginCredentials);
		});

		await waitFor(() => {
			expect(result.current.isPending).toBe(true);
		});

		act(() => {
			resolveRequest?.({ token, user });
		});

		await waitFor(() => {
			expect(result.current.isPending).toBe(false);
		});
	});

	it("should be able to show social login feedback", async () => {
		const { result } = renderHook(() => useLoginForm());

		act(() => {
			result.current.onSocialLogin("google");
		});

		await waitFor(() => {
			expect(toast.info).toHaveBeenCalledTimes(1);
		});

		expect(toast.info).toHaveBeenCalled();
		expect(toast.info).toHaveBeenCalledTimes(1);
		expect(toast.info).toHaveBeenCalledWith(
			"Google login is not implemented yet.",
		);
	});

	it("should be able to show forgot password feedback", async () => {
		const { result } = renderHook(() => useLoginForm());

		act(() => {
			result.current.onForgotPassword();
		});

		await waitFor(() => {
			expect(toast.info).toHaveBeenCalled();
			expect(toast.info).toHaveBeenCalledTimes(1);
			expect(toast.info).toHaveBeenCalledWith(
				"Password recovery is not implemented yet.",
			);
		});

		expect(toast.info).toHaveBeenCalledWith(
			"Password recovery is not implemented yet.",
		);
	});

	it("should be able to show create account feedback", async () => {
		const { result } = renderHook(() => useLoginForm());

		act(() => {
			result.current.onCreateAccount();
		});

		await waitFor(() => {
			expect(toast.info).toHaveBeenCalledTimes(1);
		});

		expect(toast.info).toHaveBeenCalled();
		expect(toast.info).toHaveBeenCalledTimes(1);
		expect(toast.info).toHaveBeenCalledWith("Sign up is not implemented yet.");
	});
});
