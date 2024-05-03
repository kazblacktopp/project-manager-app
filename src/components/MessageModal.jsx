import { forwardRef } from 'react';

const MessageModal = forwardRef((props, ref) => {
	return (
		<dialog
			ref={ref}
			className="backdrop:bg-stone-900/90 py-4 px-8 rounded-md shadow-md"
		>
			<h2 className="text-xl font-bold text-stone-700 my-4">
				Invalid Input
			</h2>
			<p className="text-stone-600 mb-4">
				Opps ... looks like you forgot to enter a value.
			</p>
			<p className="text-stone-600 mb-4">
				Please make sure you provide a valid value for every input
				field.
			</p>
			<form
				method="dialog"
				className="flex items-center justify-end gap-4 mt-8"
			>
				<button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">
					Okay
				</button>
			</form>
		</dialog>
	);
});

export default MessageModal;
