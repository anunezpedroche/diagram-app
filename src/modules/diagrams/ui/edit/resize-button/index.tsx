import {
	DefaultStylePanel,
	DefaultStylePanelContent,
	TLDrawShapeProps,
	useEditor,
	useRelevantStyles,
} from 'tldraw';
import { Button } from '~/components/ui/button';

export function ResizeButton() {
	const editor = useEditor();
	const styles = useRelevantStyles();

	const resizeShapes = (size: number) => {
		const selectedShapes = editor.getSelectedShapeIds();
		if (selectedShapes.length === 0) {
			return;
		}
		selectedShapes.map(shapeId => {
			const shape = editor.getShape(shapeId);
			if (!shape) {
				return;
			}
			const newScale = (shape.props as TLDrawShapeProps).scale + size;
			if (newScale < 0.01) {
				return;
			}
			editor.updateShape({
				id: shapeId,
				props: { ...shape.props, scale: newScale },
				type: shape.type,
			});
		});
	};

	return (
		<DefaultStylePanel>
			<DefaultStylePanelContent styles={styles} />
			<div className={`flex h-fit w-full flex-row justify-between gap-2 p-2`}>
				<Button
					className="pointer-events-auto"
					onClick={() => resizeShapes(-1)}
				>
					-
				</Button>
				<Button className="pointer-events-auto" onClick={() => resizeShapes(1)}>
					+
				</Button>
			</div>
		</DefaultStylePanel>
	);
}
