import { Compass } from "lucide-react";

export function DiscoveryPageHeader() {
	return (
		<header
			className="flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-end"
			data-testid="discovery-page-header"
		>
			<div className="flex flex-col gap-1.5">
				<div className="flex items-center gap-2">
					<Compass className="size-3.5 text-primary" />
					<span className="font-bold text-[11px] text-primary tracking-[0.16em]">
						DISCOVER
					</span>
				</div>
				<h1
					className="font-heading font-bold text-3xl text-foreground tracking-tight md:text-[32px]"
					data-testid="discovery-page-header-title"
				>
					Films worth your evening
				</h1>
				<p
					className="text-muted-foreground text-sm"
					data-testid="discovery-page-header-subtitle"
				>
					Hand-picked from 12,847 titles · updated 14 minutes ago
				</p>
			</div>
		</header>
	);
}
