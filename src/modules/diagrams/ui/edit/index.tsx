'use client';

import 'tldraw/tldraw.css';

import {
	createTLStore,
	Editor,
	getSnapshot,
	loadSnapshot,
	Tldraw,
	TLStore,
} from 'tldraw';
import { Diagram } from '~/modules/diagrams/domain/diagram';
import { useCallback, useEffect, useState } from 'react';
import { api } from '~/trpc/react';
import { ResizeButton } from './resize-button';
import moment from 'moment';
interface IEditor {
	diagram: Diagram;
}

export default function CustomEditor({ diagram }: IEditor) {
	const diagramApi = api.diagrams.update.useMutation();

	const [editor, setEditor] = useState<Editor>();
	const [saveFlag, setSaveFlag] = useState<number>(0);

	const setAppToState = useCallback((editor: Editor) => {
		setEditor(editor);
	}, []);

	const [store] = useState<TLStore>(() => {
		const newStore = createTLStore();
		if (!diagram.snapshot) {
			return newStore;
		}

		const snapshot = JSON.parse(diagram.snapshot);
		loadSnapshot(newStore, snapshot);

		return newStore;
	});

	const saveChanges = async () => {
		if (!editor) return;
		const snapshot = getSnapshot(editor.store);
		diagramApi.mutate({
			...diagram,
			diagramId: diagram.id,
			snapshot: JSON.stringify(snapshot),
		});
	};
	const unlisten = editor?.store.listen(
		() => {
			setSaveFlag(saveFlag + 1);
		},
		{ scope: 'document', source: 'user' },
	);

	useEffect(() => {
		const timeout = setTimeout(() => {
			saveChanges();
		}, 1500);
		return () => {
			clearTimeout(timeout);
		};
	}, [saveFlag]);

	return (
		<div style={{ position: 'absolute', inset: 50 }}>
			<div className="flex justify-between">
				<h3 className="text-2xl font-bold">{diagram.title}</h3>
				<p className="text-sm text-gray-500 content-center">
					Last modified:{' '}
					{diagram.updateDate
						? moment(diagram.updateDate).format('dd/MM/yyy - HH:mm')
						: moment(diagram.creationDate).format('dd/MM/yyy - HH:mm')}
				</p>
			</div>
			<div className="tldraw__editor h-full w-full">
				<Tldraw
					store={store}
					onMount={setAppToState}
					components={{ StylePanel: ResizeButton }}
				/>
			</div>
		</div>
	);
}
