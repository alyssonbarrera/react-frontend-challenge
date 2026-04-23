import "@testing-library/react";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./mocks/node";

const resizeObserverMock = vi.fn(() => ({
	disconnect: vi.fn(),
	observe: vi.fn(),
	unobserve: vi.fn(),
}));

beforeAll(() => {
	server.listen();
	vi.stubGlobal("ResizeObserver", resizeObserverMock);
});

afterEach(() => {
	server.resetHandlers();
	cleanup();
});

afterAll(() => {
	server.close();
	vi.unstubAllGlobals();
});
