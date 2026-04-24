import type { BeforeRequestState } from "ky";
import { useAuthStore as authStore } from "@/core/stores/auth-store";
import { getTokenFromCookie } from "@/infra/cookies/auth-cookie.utils";

export function beforeRequest({ request }: BeforeRequestState) {
	const token = authStore.getState().token ?? getTokenFromCookie();

	if (token) {
		request.headers.set("Authorization", `Bearer ${token}`);
	}
}
