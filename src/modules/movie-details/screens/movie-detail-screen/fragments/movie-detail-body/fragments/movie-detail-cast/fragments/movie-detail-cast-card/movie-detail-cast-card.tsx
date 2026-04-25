import { Avatar, AvatarFallback } from "@/core/components/ui/avatar";

type MovieDetailCastCardProps = {
	name: string;
	role: string;
};

function getInitials(name: string): string {
	const parts = name.trim().split(/\s+/);
	const initials = parts.slice(0, 2).map((part) => part.charAt(0));
	return initials.join("").toUpperCase();
}

export function MovieDetailCastCard({ name, role }: MovieDetailCastCardProps) {
	const initials = getInitials(name);

	return (
		<article
			className="flex flex-col items-center gap-2.5 rounded-[14px] border border-border bg-card p-4.5"
			data-testid="movie-detail-cast-card"
		>
			<Avatar className="size-16" data-testid="movie-detail-cast-card-avatar">
				<AvatarFallback className="bg-surface-elevated font-heading font-semibold text-muted-foreground text-sm">
					{initials}
				</AvatarFallback>
			</Avatar>
			<span
				className="font-heading font-semibold text-[13px] text-foreground"
				data-testid="movie-detail-cast-card-name"
			>
				{name}
			</span>
			<span
				className="text-[11px] text-muted-foreground"
				data-testid="movie-detail-cast-card-role"
			>
				{role}
			</span>
		</article>
	);
}
