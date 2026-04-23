import { act, renderHook, waitFor } from "@testing-library/react";
import { toast } from "sonner";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useLoginMutation } from "../../mutations/use-auth-mutations";
import { useLoginForm } from "./login-form.hook";

vi.mock("sonner", () => ({
	toast: {
		info: vi.fn(),
	},
}));

vi.mock("../../mutations/use-auth-mutations");

describe("useLoginForm", () => {
	const loginFormMutate = vi.fn();
	let defaultUseLoginMutationMock: ReturnType<typeof useLoginMutation>;

	beforeEach(() => {
		defaultUseLoginMutationMock = {
			mutate: loginFormMutate,
			isPending: false,
		} as unknown as ReturnType<typeof useLoginMutation>;

		vi.mocked(useLoginMutation).mockReturnValue(defaultUseLoginMutationMock);
	});

	it("should be able to submit credentials with email and password", async () => {
		const { result } = renderHook(() => useLoginForm());

		act(() => {
			result.current.onSubmit({
				email: "john.doe@cinedash.app",
				password: "12345678",
			});
		});

		await waitFor(() => {
			expect(loginFormMutate).toHaveBeenCalledTimes(1);
		});

		expect(loginFormMutate).toHaveBeenCalledWith({
			email: "john.doe@cinedash.app",
			password: "12345678",
		});
	});

	it("should be able to expose pending state from sign in mutation", async () => {
		vi.mocked(useLoginMutation).mockReturnValue({
			...defaultUseLoginMutationMock,
			isPending: true,
		} as unknown as ReturnType<typeof useLoginMutation>);

		const { result } = renderHook(() => useLoginForm());

		await waitFor(() => {
			expect(result.current.isPending).toBe(true);
		});
	});

	it("should be able to show social sign in feedback", async () => {
		const { result } = renderHook(() => useLoginForm());

		act(() => {
			result.current.onSocialSignIn("google");
		});

		await waitFor(() => {
			expect(toast.info).toHaveBeenCalledTimes(1);
		});

		expect(toast.info).toHaveBeenCalled();
		expect(toast.info).toHaveBeenCalledTimes(1);
		expect(toast.info).toHaveBeenCalledWith("Not implemented yet");
	});
});
