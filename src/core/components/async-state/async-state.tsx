import type { ReactNode } from "react";

export type AsyncStateProps = {
	children: ReactNode;
	errorComponent: ReactNode;
	emptyComponent?: ReactNode;
	isEmpty?: boolean;
	isError: boolean;
	isLoading: boolean;
	loadingComponent: ReactNode;
};

export function AsyncState({
	children,
	errorComponent,
	emptyComponent,
	isEmpty = false,
	isError,
	isLoading,
	loadingComponent,
}: AsyncStateProps) {
	if (isLoading) {
		return loadingComponent;
	}

	if (isError) {
		return errorComponent;
	}

	if (isEmpty) {
		return emptyComponent ?? null;
	}

	return children;
}
