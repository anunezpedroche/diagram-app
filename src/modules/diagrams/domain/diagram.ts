export type Diagram = {
	id: number;
	title: String;
	description: String;
	creationDate: Date;
	updateDate?: Date;
	snapshot?: string;
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
}
