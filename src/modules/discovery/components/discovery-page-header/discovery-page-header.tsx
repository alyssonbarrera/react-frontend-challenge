import { Compass } from "lucide-react";
import {
	PageHeader,
	PageHeaderBadge,
	PageHeaderContent,
	PageHeaderSubtitle,
	PageHeaderTitle,
} from "@/core/components/page-header";

export function DiscoveryPageHeader() {
	return (
		<PageHeader
			className="flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-end"
			data-testid="discovery-page-header"
		>
			<PageHeaderContent>
				<PageHeaderBadge
					label="DISCOVER"
					icon={<Compass className="size-3.5 text-primary" />}
				/>
				<PageHeaderTitle data-testid="discovery-page-header-title">
					Films worth your evening
				</PageHeaderTitle>
				<PageHeaderSubtitle data-testid="discovery-page-header-subtitle">
					Hand-picked from 12,847 titles · updated 14 minutes ago
				</PageHeaderSubtitle>
			</PageHeaderContent>
		</PageHeader>
	);
}
