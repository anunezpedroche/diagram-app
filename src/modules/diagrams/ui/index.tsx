import DiagramsList from './list';
import { Diagram } from '../domain/diagram';
import { api } from '~/trpc/server';
import { Button } from '~/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '~/components/ui/popover';
import CreateDiagramForm from './create-form';

export default async function DiagramsPage() {
	const userDiagrams = await api.diagrams.getAllByUser({ userId: 1 });

	return (
		<>
			<section>
				<Popover>
					<PopoverTrigger asChild>
						<Button>Create new diagram</Button>
					</PopoverTrigger>
					<PopoverContent>
						<CreateDiagramForm />
					</PopoverContent>
				</Popover>
			</section>
			<DiagramsList diagrams={userDiagrams as Diagram[]} />
		</>
	);
}
