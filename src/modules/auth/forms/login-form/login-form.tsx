import {
	Apple,
	ArrowRight,
	Github,
	Globe,
	type LucideIcon,
	Mail,
} from "lucide-react";
import { Button } from "@/core/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/core/components/ui/field";
import { Input } from "@/core/components/ui/input";
import { InputPassword } from "@/core/components/ui/input-password";
import { Separator } from "@/core/components/ui/separator";
import { Spinner } from "@/core/components/ui/spinner";
import { useLoginForm } from "./login-form.hook";

type SocialLoginButton = {
	label: string;
	testId: string;
	icon: LucideIcon;
	onClick: VoidFunction;
};

export function LoginForm() {
	const {
		errors,
		onSubmit,
		register,
		isPending,
		handleSubmit,
		onSocialLogin,
		onForgotPassword,
		onCreateAccount,
	} = useLoginForm();

	const socialLoginButtons: SocialLoginButton[] = [
		{
			icon: Globe,
			label: "Google",
			testId: "login-form-google-button",
			onClick: () => onSocialLogin("google"),
		},
		{
			icon: Apple,
			label: "Apple",
			testId: "login-form-apple-button",
			onClick: () => onSocialLogin("apple"),
		},
		{
			icon: Github,
			label: "GitHub",
			testId: "login-form-github-button",
			onClick: () => onSocialLogin("github"),
		},
	];

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full max-w-110 space-y-4"
			data-testid="login-form"
		>
			<FieldGroup>
				<Field data-invalid={!!errors.email}>
					<FieldLabel
						htmlFor="email"
						className="text-[11px] tracking-[0.12em] uppercase"
					>
						Email
					</FieldLabel>
					<div className="group relative">
						<Mail className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
						<Input
							id="email"
							type="email"
							aria-invalid={!!errors.email}
							placeholder="john.doe@cinedash.app"
							className="pl-11"
							autoComplete="email"
							data-testid="login-form-email-input"
							{...register("email")}
						/>
					</div>
					<FieldError errors={[errors.email]} />
				</Field>

				<Field data-invalid={!!errors.password}>
					<div className="flex items-center justify-between">
						<FieldLabel
							htmlFor="password"
							className="text-[11px] tracking-[0.12em] uppercase"
						>
							Password
						</FieldLabel>

						<Button
							type="button"
							variant="link"
							className="text-xs p-0 h-auto hover:no-underline hover:text-primary/80 cursor-pointer"
							onClick={onForgotPassword}
							data-testid="login-form-forgot-button"
						>
							Forgot?
						</Button>
					</div>

					<InputPassword
						id="password"
						placeholder="••••••••••••"
						aria-invalid={!!errors.password}
						autoComplete="current-password"
						data-testid="login-form-password-input"
						{...register("password")}
					/>

					<FieldError errors={[errors.password]} />
				</Field>
			</FieldGroup>

			<Button
				type="submit"
				size="lg"
				className="w-full rounded-3xl text-base cursor-pointer"
				disabled={isPending}
				data-testid="login-form-submit-button"
			>
				Login to CineDash
				{isPending && <Spinner />}
				{!isPending && <ArrowRight />}
			</Button>

			<div className="flex w-full items-center gap-2">
				<Separator className="flex-1" />
				<span className="shrink-0 text-nowrap font-medium text-xs text-muted-foreground">
					or continue with
				</span>
				<Separator className="flex-1" />
			</div>

			<div className="grid grid-cols-3 gap-3 mt-4">
				{socialLoginButtons.map(({ onClick, testId, icon: Icon, label }) => (
					<Button
						key={testId}
						type="button"
						variant="outline"
						className="cursor-pointer"
						onClick={onClick}
						data-testid={testId}
					>
						<Icon /> {label}
					</Button>
				))}
			</div>

			<p className="pt-1 text-center text-sm text-muted-foreground">
				New to CineDash?{" "}
				<Button
					type="button"
					variant="link"
					className="p-0 h-auto font-semibold"
					onClick={onCreateAccount}
					data-testid="login-form-signup-button"
				>
					Create an account
				</Button>
			</p>
		</form>
	);
}
