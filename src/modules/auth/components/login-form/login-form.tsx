import { Apple, ArrowRight, Github, Globe, Mail } from "lucide-react";
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
import { useLoginForm } from "./login-form.hook";

export function LoginForm() {
	const {
		errors,
		onSubmit,
		register,
		isPending,
		handleSubmit,
		onSocialSignIn,
	} = useLoginForm();

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

						<button
							type="button"
							className="text-xs font-medium text-primary hover:text-primary/80"
							data-testid="login-form-forgot-button"
						>
							Forgot?
						</button>
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
				className="w-full rounded-3xl text-base"
				disabled={isPending}
				data-testid="login-form-submit-button"
			>
				{isPending ? "Signing in..." : "Sign in to CineDash"}
				<ArrowRight data-icon="inline-end" />
			</Button>

			<div className="flex w-full items-center gap-2">
				<Separator className="flex-1" />
				<span className="shrink-0 text-nowrap font-medium text-xs text-muted-foreground">
					or continue with
				</span>
				<Separator className="flex-1" />
			</div>

			<div className="grid grid-cols-3 gap-3 mt-4">
				<Button
					type="button"
					variant="outline"
					className="h-12 rounded-xl"
					onClick={() => {
						onSocialSignIn("google");
					}}
					data-testid="login-form-google-button"
				>
					<Globe data-icon="inline-start" /> Google
				</Button>
				<Button
					type="button"
					variant="outline"
					className="h-12 rounded-xl"
					onClick={() => {
						onSocialSignIn("apple");
					}}
					data-testid="login-form-apple-button"
				>
					<Apple data-icon="inline-start" /> Apple
				</Button>
				<Button
					type="button"
					variant="outline"
					className="h-12 rounded-xl"
					onClick={() => {
						onSocialSignIn("github");
					}}
					data-testid="login-form-github-button"
				>
					<Github data-icon="inline-start" /> GitHub
				</Button>
			</div>

			<p className="pt-1 text-center text-sm text-muted-foreground">
				New to CineDash?{" "}
				<button
					type="button"
					className="font-semibold text-primary hover:text-primary/85"
					onClick={() => {
						onSocialSignIn("google");
					}}
					data-testid="login-form-signup-button"
				>
					Create an account
				</button>
			</p>
		</form>
	);
}
