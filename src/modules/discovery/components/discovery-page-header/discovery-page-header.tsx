import { Compass } from "lucide-react";
import {
	PageHeader,
	PageHeaderBadge,
	PageHeaderContent,
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
			</PageHeaderContent>
		</PageHeader>
	);
}
