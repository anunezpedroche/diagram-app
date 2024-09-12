import { Diagram } from '../../domain/diagram';

interface IDiagramsList {
	diagrams: Diagram[];
}

export default async function DiagramsList({ diagrams }: IDiagramsList) {
	return (
		<ul>
			{diagrams.map(diagram => {
				return <li key={diagram.id}>{diagram.title}</li>;
			})}
		</ul>
	);
}
