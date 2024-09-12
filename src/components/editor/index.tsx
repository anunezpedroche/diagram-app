'use client';

import 'tldraw/tldraw.css';

import { createTLStore, loadSnapshot, Tldraw, TLStore } from 'tldraw';
import { Diagram } from '~/modules/diagrams/domain/diagram';
import { useState } from 'react';

interface IEditor {
	diagram: Diagram;
}

export default function Editor({ diagram }: IEditor) {
	const [store] = useState<TLStore>(() => {
		const newStore = createTLStore();
		console.log(diagram);
		if (!diagram.snapshot) {
			return newStore;
		}

		const snapshot = JSON.parse(diagram.snapshot);
		loadSnapshot(newStore, snapshot);

		return newStore;
	});

	return (
		<div className="tldraw__editor h-full w-full">
			<Tldraw store={store} />
		</div>
	);
}
