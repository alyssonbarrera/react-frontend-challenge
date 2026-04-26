import { cva } from "class-variance-authority";
import { Film, type LucideIcon, TriangleAlert, ZapOff } from "lucide-react";
import type { ReactNode } from "react";

type ErrorStateVariant = "error" | "notFound";

type ErrorStateVisualConfig = {
	mainIcon: LucideIcon;
	badgeIcon: LucideIcon;
	badgeLabel: string;
};

const mainIconContainerVariants = cva(
	"flex size-35 items-center justify-center rounded-full border",
	{
		variants: {
			variant: {
				notFound: "border-subtle bg-accent-cyan-soft",
				error: "border-error/30 bg-error/15",
			},
		},
	},
);

const mainIconInnerContainerVariants = cva(
	"flex size-24 items-center justify-center rounded-full border bg-surface-elevated",
	{
		variants: {
			variant: {
				notFound: "border-strong",
				error: "border-error/40",
			},
		},
	},
);

const mainIconVariants = cva("size-10", {
	variants: {
		variant: {
			notFound: "text-accent-cyan",
			error: "text-error",
		},
	},
});

const badgeContainerVariants = cva(
	"flex items-center gap-2 rounded-full px-3 py-1.5",
	{
		variants: {
			variant: {
				notFound: "bg-accent-amber-soft",
				error: "bg-error/15",
			},
		},
	},
);

const badgeIconVariants = cva("size-3.5", {
	variants: {
		variant: {
			notFound: "text-accent-amber",
			error: "text-error",
		},
	},
});

const badgeLabelVariants = cva("font-semibold text-[11px] tracking-[0.15em]", {
	variants: {
		variant: {
			notFound: "text-accent-amber",
			error: "text-error",
		},
	},
});

const errorStateVisualConfigByVariant: Record<
	ErrorStateVariant,
	ErrorStateVisualConfig
> = {
	notFound: {
		mainIcon: Film,
		badgeIcon: TriangleAlert,
		badgeLabel: "ERROR 404",
	},
	error: {
		mainIcon: TriangleAlert,
		badgeIcon: ZapOff,
		badgeLabel: "SOMETHING BROKE",
	},
};

type ErrorStateProps = {
	variant: ErrorStateVariant;
	title: string;
	description: string;
	actions: ReactNode;
	containerTestId: string;
	titleTestId: string;
	descriptionTestId: string;
};

export function ErrorState({
	title,
	actions,
	variant,
	description,
	titleTestId,
	containerTestId,
	descriptionTestId,
}: ErrorStateProps) {
	const errorStateVisualConfig = errorStateVisualConfigByVariant[variant];
	const MainIcon = errorStateVisualConfig.mainIcon;
	const BadgeIcon = errorStateVisualConfig.badgeIcon;

	return (
		<div
			className="flex min-h-dvh w-full flex-1 items-center justify-center bg-background px-6 py-16"
			data-testid={containerTestId}
		>
			<div className="flex w-full max-w-xl flex-col items-center gap-6 text-center">
				<div className={mainIconContainerVariants({ variant })}>
					<div className={mainIconInnerContainerVariants({ variant })}>
						<MainIcon className={mainIconVariants({ variant })} />
					</div>
				</div>

				<div className={badgeContainerVariants({ variant })}>
					<BadgeIcon className={badgeIconVariants({ variant })} />
					<span className={badgeLabelVariants({ variant })}>
						{errorStateVisualConfig.badgeLabel}
					</span>
				</div>

				<div className="flex flex-col gap-3">
					<h1
						className="font-heading font-bold text-4xl text-ink-primary leading-tight tracking-tight md:text-5xl"
						data-testid={titleTestId}
					>
						{title}
					</h1>
					<p
						className="text-base text-ink-secondary leading-relaxed"
						data-testid={descriptionTestId}
					>
						{description}
					</p>
				</div>

				<div className="flex flex-wrap items-center justify-center gap-3">
					{actions}
				</div>
			</div>
		</div>
	);
}
