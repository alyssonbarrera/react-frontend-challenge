export type SignInWithEmailRequestParams = {
	email: string;
	password: string;
};

export type SignInWithEmailRequestResponse = {
	token: string;
	user: {
		id: string;
		name: string;
		email: string;
	};
};

const FAKE_REQUEST_DELAY_MS = 800;

export async function signInWithEmailRequest({
	email,
	password,
}: SignInWithEmailRequestParams): Promise<SignInWithEmailRequestResponse> {
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
