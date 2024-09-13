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
		<div className="tldraw__editor h-full w-full">
			<Tldraw store={store} onMount={setAppToState} />
		</div>
	);
}
