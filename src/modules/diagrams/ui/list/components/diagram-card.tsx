'use client';
import { Diagram } from '~/modules/diagrams/domain/diagram';
import moment from 'moment';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';

interface IDiagramCard {
	diagram: Diagram;
}

export default function DiagramCard({ diagram }: IDiagramCard) {
	const router = useRouter();

	const diagramApi = api.diagrams.deleteById.useMutation({
		onSuccess: () => {
			router.refresh();
		},
	});

	const handleEdit = () => {
		router.push(`/diagrams/${diagram.id}`);
	};

	const handleDelete = () => {
		diagramApi.mutate({ id: diagram.id });
	};

	return (
		<Card className="hover:shadow-xl content-between">
			<CardHeader>
				<CardTitle>{diagram.title}</CardTitle>
				<CardDescription>
					{diagram.updateDate ? 'Update date ' : 'Creation date '}
					{moment(diagram.updateDate ?? diagram.creationDate).format(
						'DD/MM/yyyy - HH:mm',
					)}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p>{diagram.description}</p>
			</CardContent>
			<CardFooter className="justify-between">
				<Button onClick={handleEdit}>Edit</Button>
				<Button
					disabled={diagramApi.isPending}
					variant={'destructive'}
					onClick={handleDelete}
				>
					Delete
				</Button>
			</CardFooter>
		</Card>
	);
}
