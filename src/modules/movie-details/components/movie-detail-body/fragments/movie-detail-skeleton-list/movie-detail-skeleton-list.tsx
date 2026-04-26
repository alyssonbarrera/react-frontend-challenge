/** biome-ignore-all lint/suspicious/noArrayIndexKey: static placeholder lists */
import { Fragment, type ReactNode } from "react";

type MovieDetailSkeletonListProps = {
	count: number;
	renderItem: (index: number) => ReactNode;
};

export function MovieDetailSkeletonList({
	count,
	renderItem,
}: MovieDetailSkeletonListProps) {
	if (count <= 0) {
		return null;
	}

	return Array.from({ length: count }, (_, index) => (
		<Fragment key={index}>{renderItem(index)}</Fragment>
	));
}
