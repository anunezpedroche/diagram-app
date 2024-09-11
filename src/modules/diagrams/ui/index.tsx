import { FormEvent } from 'react';
import { createApiDiagramRepository } from '../infra/ApiDiagramRepository';
import { createApiUserRepository } from '~/modules/users/infra/ApiUserRepository';

const userRepository = createApiUserRepository();
const diagramRepository = createApiDiagramRepository();

export default function DiagramsPage() {
	async function createDiagram(formData: FormData) {
		'use server';

		const rawFormData = {
			title: formData.get('title'),
			description: formData.get('description'),
		};
		console.log(rawFormData);
		if (!rawFormData.title) {
			return;
		}
		const user = await userRepository.getUserById(1);
		console.log(user);
		const response = await diagramRepository.createDiagram(
			rawFormData.title as string,
			rawFormData.description as string,
		);
	}

	return (
		<>
			<form action={createDiagram}>
				<input name="title" placeholder="Diagram title" />
				<input name="description" placeholder="Diagram description" />
				<button type="submit">Create</button>
			</form>
		</>
	);
}
