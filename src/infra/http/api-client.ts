import ky from "ky";
import { beforeRequest } from "./api-client.utils";

export const api = ky.create({
	prefix: import.meta.env.VITE_API_URL || "http://localhost:3333",
	timeout: 10_000,
	hooks: {
		beforeRequest: [beforeRequest],
	},
});
