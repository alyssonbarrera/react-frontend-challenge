import type { HttpHandler } from "msw";
import { discoveryHandlers } from "./discovery-handlers";

export const handlers: HttpHandler[] = [...discoveryHandlers];
