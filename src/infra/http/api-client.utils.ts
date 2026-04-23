import type { BeforeRequestState } from "ky";
import { getCookie } from "../cookies/cookie-utils";

export function beforeRequest({ request }: BeforeRequestState) {
	const token = getCookie();

	if (token) {
		request.headers.set("Authorization", `Bearer ${token}`);
	}
}
