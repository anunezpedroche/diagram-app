import { redirect } from 'next/navigation';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { api } from '~/trpc/server';

export default async function CreateDiagramForm() {
	async function createDiagram(formData: FormData) {
		'use server';
		if (!formData.get('title')) {
			return;
		}
		if (!formData.get('description')) {
			return;
		}

		const diagramData = {
			title: formData.get('title') as string,
			description: formData.get('description') as string,
			snapshot: null,
		};

		const result = await api.diagrams.create({ ...diagramData });
		1;
		console.log(result);
		if (result) {
			redirect(`/diagrams/${result.id}`);
		}
	}

	return (
		<form action={createDiagram}>
			<Label>Diagram title</Label>
			<Input name="title" placeholder="Title..." />
			<Label>Diagram description</Label>
			<Input name="description" placeholder="Description..." />
			<Button type="submit">Create new</Button>
		</form>
	);
}
