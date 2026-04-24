import type { UserDTO } from "@/core/dtos/user-dto";

export type LoginWithCredentialsRequestParams = {
	email: string;
	password: string;
};

export type LoginWithCredentialsRequestResponse = {
	token: string;
	user: UserDTO;
};

const FAKE_REQUEST_DELAY_MS = 800;

export async function loginWithCredentialsRequest({
	email,
	password,
}: LoginWithCredentialsRequestParams): Promise<LoginWithCredentialsRequestResponse> {
	await new Promise((resolve) => {
		setTimeout(resolve, FAKE_REQUEST_DELAY_MS);
	});

	if (!email || !password) {
		throw new Error("Invalid credentials.");
	}

	return {
		token: crypto.randomUUID(),
		user: {
			id: crypto.randomUUID(),
			name: "Alex Morgan",
			email,
		},
	};
}
