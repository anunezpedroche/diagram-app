import { TRPCClientErrorLike } from '@trpc/client';
import { UseTRPCMutationResult } from '@trpc/react-query/shared';
import { InferrableClientTypes } from '@trpc/server/unstable-core-do-not-import';
import { useEffect, useState } from 'react';

export type ResolverDef = {
	input: any;
	output: any;
	transformer: boolean;
	errorShape: any;
};

export function useValidation<
	T extends object,
	S extends InferrableClientTypes,
>(
	initial_value: T,
	trcpApi: UseTRPCMutationResult<
		ResolverDef['output'],
		TRPCClientErrorLike<S>,
		ResolverDef['input'],
		unknown
	>,
) {
	const [errors, setErrors] = useState<T>(initial_value);
	useEffect(() => {
		const errorKeys = trcpApi.error?.data?.zodError?.fieldErrors
			? Object.keys(trcpApi.error?.data?.zodError?.fieldErrors)
			: [];
		if (errorKeys.length === 0) {
			return;
		}
		const errorFields = Object.keys(errors).filter(key =>
			errorKeys.includes(key),
		);

		if (errorFields.length === 0) {
			return;
		}
		const errorObject = errorFields.reduce((acc: object, key: string) => {
			if (typeof acc === 'object') {
				return { ...acc, [key]: true };
			}
			return acc;
		}, {});
		setErrors({ ...errors, ...errorObject });
	}, [trcpApi.error]);
	return { errors, setErrors };
}
