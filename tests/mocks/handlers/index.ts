import type { HttpHandler } from "msw";
import { discoveryHandlers } from "./discovery-handlers";
import { movieDetailsHandlers } from "./movie-details-handlers";

export const handlers: HttpHandler[] = [
	...discoveryHandlers,
	...movieDetailsHandlers,
];
