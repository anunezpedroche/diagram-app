import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { decrypt } from '~/lib/token-management';
import { Diagram } from '~/modules/diagrams/domain/diagram';
import CustomEditor from '~/modules/diagrams/ui/edit';
import { Session } from '~/modules/users/domain/session';
import { api } from '~/trpc/server';

interface IDiagramEditor {
	params: {
		id: number;
	};
}

export default async function DiagramEditor({ params }: IDiagramEditor) {
	const user = await decrypt<Session>(cookies().get('session')?.value ?? '');
	if (!user) {
		redirect('/login');
	}
	const diagram = await api.diagrams.getById({
		id: Number(params.id),
		userId: user.id,
	});
	if (!diagram.data) {
		redirect('/diagrams');
	}

	return <CustomEditor diagram={diagram.data as Diagram} />;
}
