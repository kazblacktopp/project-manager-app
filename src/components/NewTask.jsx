import { forwardRef } from 'react';

const NewTask = forwardRef(({ onAddTask }, ref) => {
	return (
		<section>
			<h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
			<div className="flex items-center gap-4">
				<input
					ref={ref}
					type="text"
					className="w-64 px-2 py-1 rounded-sm bg-stone-200"
				/>
				<button
					type="button"
					onClick={onAddTask}
					className="text-stone-700 hover:text-stone-950"
				>
					Add Task
				</button>
			</div>
		</section>
	);
});

export default NewTask;
