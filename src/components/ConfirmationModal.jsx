import { forwardRef } from 'react';

const ConfirmationModal = forwardRef(({ itemId, onDelete, onCancel }, ref) => {
	return (
		<dialog
			ref={ref}
			className="backdrop:bg-stone-900/90 py-4 px-8 rounded-md shadow-md"
		>
			<h2 className="text-xl font-bold text-stone-700 my-4">
				Delete Project
			</h2>
			<p className="text-stone-600 mb-4">
				Are you sure you want to delete <strong>{itemId}</strong>?
			</p>
			<form className="flex items-center justify-end gap-4 mt-8">
				<button
					type="button"
					onClick={onCancel}
					className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
				>
					Cancel
				</button>
				<button
					type="button"
					onClick={() => onDelete(itemId)}
					className="text-stone-800 hover:text-stone-950"
				>
					Delete
				</button>
			</form>
		</dialog>
	);
});

export default ConfirmationModal;
