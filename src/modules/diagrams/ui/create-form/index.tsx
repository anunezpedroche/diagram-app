'use client';
import { useRouter } from 'next/navigation';
import { useValidation } from '~/components/hooks/useValidation';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { api } from '~/trpc/react';
import { InferrableClientTypes } from '@trpc/server/unstable-core-do-not-import';

const INITIAL_ERRORS_STATE = { title: false, description: false };

export default function CreateDiagramForm() {
	const router = useRouter();

	const createDiagramApi = api.diagrams.create.useMutation({
		onSuccess: data => {
			if (data.success && data.data) {
				router.push(`/diagrams/${data.data.id}`);
			}
		},
	});

	const { errors, setErrors } = useValidation<
		typeof INITIAL_ERRORS_STATE,
		InferrableClientTypes
	>(INITIAL_ERRORS_STATE, createDiagramApi);

	async function createDiagram(formData: FormData) {
		if (!formData.get('title')) {
			return;
		}
		if (!formData.get('description')) {
			return;
		}
		setErrors(INITIAL_ERRORS_STATE);
		const diagramData = {
			title: formData.get('title') as string,
			description: formData.get('description') as string,
			snapshot: null,
		};
		createDiagramApi.mutate(diagramData);
	}

	return (
		<form action={createDiagram}>
			<Label>Diagram title</Label>
			<Input
				className={errors.title ? 'border-red-500' : ''}
				name="title"
				placeholder="Title..."
			/>
			<p className="text-red-500 text-xs h-6">
				{errors.title &&
					createDiagramApi.error?.data?.zodError?.fieldErrors['title']}
			</p>
			<Label>Diagram description</Label>
			<Input
				className={errors.title ? 'border-red-500' : ''}
				name="description"
				placeholder="Description..."
			/>
			<p className="text-red-500 text-xs h-6">
				{errors.description &&
					createDiagramApi.error?.data?.zodError?.fieldErrors['description']}
			</p>
			<Button disabled={createDiagramApi.isPending} type="submit">
				Create new
			</Button>
		</form>
	);
}
