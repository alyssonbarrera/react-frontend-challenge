import type { ComponentProps } from "react";
import { cn } from "@/core/lib/utils";

type MovieDetailSectionLabelProps = ComponentProps<"span">;

export function MovieDetailSectionLabel({
	className,
	...props
}: MovieDetailSectionLabelProps) {
	return (
		<span
			className={cn(
				"font-heading font-semibold text-[11px] text-accent-cyan uppercase tracking-[0.18em]",
				className,
			)}
			{...props}
		/>
	);
}
