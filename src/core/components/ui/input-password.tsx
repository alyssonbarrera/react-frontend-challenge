import { Eye, EyeOff, Lock } from "lucide-react";
import * as React from "react";
import { cn } from "@/core/lib/utils";
import { Input } from "./input";

function InputPassword({
	className,
	...props
}: Omit<React.ComponentProps<typeof Input>, "type">) {
	const [isVisible, setIsVisible] = React.useState(false);

	function toggleVisibility() {
		setIsVisible((currentVisibility) => !currentVisibility);
	}

	return (
		<div className="group relative">
			<Lock className="pointer-events-none absolute top-[48%] left-4 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
			<Input
				type={isVisible ? "text" : "password"}
				className={cn(
					"pl-11 pr-11 [&::-ms-clear]:hidden [&::-ms-reveal]:hidden",
					className,
				)}
				{...props}
			/>
			<button
				type="button"
				onClick={toggleVisibility}
				className="cursor-pointer absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
				aria-label={isVisible ? "Hide password" : "Show password"}
			>
				{isVisible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
			</button>
		</div>
	);
}

export { InputPassword };
