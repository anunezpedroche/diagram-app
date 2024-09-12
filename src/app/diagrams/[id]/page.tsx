import Editor from '~/components/editor';
import { Diagram } from '~/modules/diagrams/domain/diagram';
import { api } from '~/trpc/server';

interface IDiagramEditor {
	params: {
		id: number;
	};
}

export default async function DiagramEditor({ params }: IDiagramEditor) {
	console.log(params);
	const diagram = await api.diagrams.getById({ id: Number(params.id) });
	return <Editor diagram={diagram as Diagram} />;
}
