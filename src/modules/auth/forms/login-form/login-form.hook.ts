import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuthStore } from "@/core/stores/auth-store";
import { useLoginMutation } from "../../mutations/use-auth-mutations";
import { type LoginSchema, loginSchema } from "../../schemas/login.schema";

type SocialProvider = "google" | "apple" | "github";

const socialProviderLabelByProvider: Record<SocialProvider, string> = {
	google: "Google",
	apple: "Apple",
	github: "GitHub",
};

export function useLoginForm() {
	const navigate = useNavigate();
	const setAuth = useAuthStore((state) => state.setAuth);

	const form = useForm<LoginSchema>({
		resolver: standardSchemaResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const loginMutation = useLoginMutation({
		onSuccess: ({ token, user }) => {
			setAuth({ token, user });
			navigate({ to: "/discovery" });
		},
		onError: () => {
			toast.error("Unable to login.", {
				description: "Please try again shortly.",
			});
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = form;

	function onSubmit({ email, password }: LoginSchema) {
		loginMutation.mutate({ email, password });
	}

	function onSocialLogin(provider: SocialProvider) {
		toast.info(
			`${socialProviderLabelByProvider[provider]} login is not implemented yet.`,
		);
	}

	function onForgotPassword() {
		toast.info("Password recovery is not implemented yet.");
	}

	function onCreateAccount() {
		toast.info("Sign up is not implemented yet.");
	}

	return {
		errors,
		register,
		onSubmit,
		handleSubmit,
		onSocialLogin,
		onForgotPassword,
		onCreateAccount,
		isPending: loginMutation.isPending,
	};
}
