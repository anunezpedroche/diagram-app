import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '~/components/ui/popover';
import { Diagram } from '../../domain/diagram';
import DiagramCard from './components/diagram-card';
import { Button } from '~/components/ui/button';
import CreateDiagramForm from '../create-form';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '~/components/ui/card';
import { CiCirclePlus } from 'react-icons/ci';

interface IDiagramsList {
	diagrams: Diagram[];
}

export default async function DiagramsList({ diagrams }: IDiagramsList) {
	return (
		<ul className="grid grid-cols-3 w-full gap-3 py-6">
			<section>
				<Popover>
					<PopoverTrigger asChild>
						<Card className="h-full border-dashed hover:border-black hover:cursor-pointer">
							<CardContent className="h-full w-full flex justify-center content-center p-6 text-[#e5e7eb] hover:text-black">
								<p className="m-auto">
									<CiCirclePlus className="h-20 w-20 " />
								</p>
							</CardContent>
						</Card>
					</PopoverTrigger>
					<PopoverContent>
						<CreateDiagramForm />
					</PopoverContent>
				</Popover>
			</section>
			{diagrams.map(diagram => {
				return (
					<li key={diagram.id}>
						<DiagramCard diagram={diagram} />
					</li>
				);
			})}
		</ul>
	);
}
