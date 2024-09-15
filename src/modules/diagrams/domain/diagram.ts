export type Diagram = {
	id: number;
	title: string;
	description: string;
	creationDate: Date;
	updateDate?: Date;
	snapshot: string | null;
	userId: number;
};

interface IDiagramCommand {
	title: string;
	description: string;
	userId: number;
}

export interface ICreateDiagramCommand extends IDiagramCommand {
	creationDate: Date;
	snapshot: string | null;
}

export interface IUpdateDiagramCommand extends IDiagramCommand {
	updateDate: Date;
	snapshot: string | null;
	diagramId: number;
	userId: number;
}
