import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { setCookie } from "@/infra/cookies/cookie-utils";
import {
	type SignInWithEmailRequestParams,
	signInWithEmailRequest,
} from "../http/sign-in-with-email-request";

export function useLoginMutation() {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: (params: SignInWithEmailRequestParams) =>
			signInWithEmailRequest(params),
		onSuccess: ({ token }) => {
			setCookie(token);
			navigate({ to: "/app" });
		},
		onError: () => {
			toast.error("Unable to sign in.", {
				description: "Please try again shortly.",
			});
		},
	});
}
