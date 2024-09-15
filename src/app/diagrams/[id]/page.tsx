import { Diagram } from '~/modules/diagrams/domain/diagram';
import CustomEditor from '~/modules/diagrams/ui/edit';
import { api } from '~/trpc/server';

interface IDiagramEditor {
	params: {
		id: number;
	};
}

export default async function DiagramEditor({ params }: IDiagramEditor) {
	const diagram = await api.diagrams.getById({ id: Number(params.id) });
	return <CustomEditor diagram={diagram.data as Diagram} />;
}
