import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { renderHook } from "@testing-library/react";
import type { DefaultValues, FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";

type MakeUseFormOverrides<TFieldValues extends FieldValues> = {
	defaultValues?: DefaultValues<TFieldValues>;
};

export function makeUseForm<TFieldValues extends FieldValues>(
	schema: unknown,
	overrides?: MakeUseFormOverrides<TFieldValues>,
) {
	return renderHook(() =>
		useForm<TFieldValues>({
			resolver: standardSchemaResolver(schema),
			defaultValues: overrides?.defaultValues,
		}),
	);
}
