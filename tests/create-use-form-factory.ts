import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import type { DefaultValues, FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { renderHook } from "@testing-library/react";

type CreateUseFormFactoryParams<TFieldValues extends FieldValues> = {
	schema: unknown;
	defaultValues?: DefaultValues<TFieldValues>;
};

export function createUseFormFactory<TFieldValues extends FieldValues>({
	schema,
	defaultValues,
}: CreateUseFormFactoryParams<TFieldValues>) {
	return renderHook(() =>
		useForm<TFieldValues>({
			resolver: standardSchemaResolver(schema),
			defaultValues,
		}),
	);
}
