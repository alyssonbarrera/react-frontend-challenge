import type { UserDTO } from "@/core/dtos/user-dto";

export function makeUser(override?: Partial<UserDTO>): UserDTO {
	return {
		id: "user-1",
		name: "John Doe",
		email: "john.doe@cinedash.app",
		avatarUrl: null,
		...override,
	};
}
