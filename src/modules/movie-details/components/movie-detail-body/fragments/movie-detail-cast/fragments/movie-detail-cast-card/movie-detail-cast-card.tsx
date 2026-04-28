import { ErrorBoundary } from "react-error-boundary";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/core/components/ui/avatar";
import { MovieDetailCastCardError } from "./movie-detail-cast-card-error";

type MovieDetailCastCardProps = {
	name: string;
	role: string;
	profilePath: string | null;
};

const TMDB_PROFILE_BASE_URL = "https://image.tmdb.org/t/p/w185";

function getInitials(name: string): string {
	const parts = name.trim().split(/\s+/);
	const initials = parts.slice(0, 2).map((part) => part.charAt(0));
	return initials.join("").toUpperCase();
}

function MovieDetailCastCardView({
	name,
	role,
	profilePath,
}: MovieDetailCastCardProps) {
	const initials = getInitials(name);
	const profileUrl = profilePath
		? `${TMDB_PROFILE_BASE_URL}${profilePath}`
		: null;

	return (
		<article
			className="flex flex-col items-center gap-2.5 rounded-[14px] border border-border bg-card p-4.5"
			data-testid="movie-detail-cast-card"
		>
			<Avatar className="size-16" data-testid="movie-detail-cast-card-avatar">
				{profileUrl && (
					<AvatarImage
						alt={name}
						src={profileUrl}
						loading="lazy"
						fetchPriority="low"
						data-testid="movie-detail-cast-card-image"
					/>
				)}
				<AvatarFallback className="bg-surface-elevated font-heading font-semibold text-muted-foreground text-sm">
					{initials}
				</AvatarFallback>
			</Avatar>

			<div className="flex flex-col items-center">
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
			</div>
		</article>
	);
}

export function MovieDetailCastCard(props: MovieDetailCastCardProps) {
	return (
		<ErrorBoundary fallback={<MovieDetailCastCardError />}>
			<MovieDetailCastCardView {...props} />
		</ErrorBoundary>
	);
}
