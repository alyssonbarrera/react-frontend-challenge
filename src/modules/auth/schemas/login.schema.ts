import { z } from "zod";

const PASSWORD_MIN_LENGTH = 6;

export const loginSchema = z.object({
	email: z.email("Please enter a valid email."),
	password: z
		.string()
		.min(
			PASSWORD_MIN_LENGTH,
			`Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`,
		),
});

export type LoginSchema = z.infer<typeof loginSchema>;
