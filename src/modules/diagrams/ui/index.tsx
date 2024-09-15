import DiagramsList from './list';
import { Diagram } from '../domain/diagram';
import { api } from '~/trpc/server';
import { Label } from '~/components/ui/label';

export default async function DiagramsPage() {
	const userDiagrams = await api.diagrams.getAllByUser();
	return (
		<>
			<DiagramsList
				diagrams={(userDiagrams.data ? userDiagrams.data : []) as Diagram[]}
			/>
		</>
	);
}
