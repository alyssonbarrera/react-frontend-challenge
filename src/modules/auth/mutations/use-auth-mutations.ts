import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import {
	type LoginWithCredentialsRequestParams,
	type LoginWithCredentialsRequestResponse,
	loginWithCredentialsRequest,
} from "../http/login-with-credentials-request";

type LoginMutationLifecycleOptions = Pick<
	UseMutationOptions<
		LoginWithCredentialsRequestResponse,
		Error,
		LoginWithCredentialsRequestParams,
		unknown
	>,
	"onSuccess" | "onError" | "onMutate"
>;

export function useLoginMutation(options: LoginMutationLifecycleOptions = {}) {
	return useMutation({
		mutationFn: (params: LoginWithCredentialsRequestParams) =>
			loginWithCredentialsRequest(params),
		...options,
	});
}
