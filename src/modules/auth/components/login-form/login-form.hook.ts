import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useLoginMutation } from "../../mutations/use-auth-mutations";
import { type LoginSchema, loginSchema } from "../../schemas/login-schema";

type SocialProvider = "google" | "apple" | "github";

export function useLoginForm() {
	const loginMutation = useLoginMutation();
	const form = useForm<LoginSchema>({
		resolver: standardSchemaResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = form;

	function onSubmit(values: LoginSchema) {
		loginMutation.mutate({ email: values.email, password: values.password });
	}

	function onSocialSignIn(_provider: SocialProvider) {
		toast.info("Not implemented yet");
	}

	return {
		errors,
		register,
		onSubmit,
		handleSubmit,
		onSocialSignIn,
		isPending: loginMutation.isPending,
	};
}
