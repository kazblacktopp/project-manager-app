import { useRef } from 'react';
import NewTask from './NewTask';

export default function Tasks({
	selectedProject,
	selectedProjectTasks,
	onDeleteProject,
	onCancelProject,
	onAddNewTask,
	onDeleteTask,
}) {
	const newTaskRef = useRef(null);

	const dateFormatOptions = {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	};

	const formattedProjectDate = new Date(
		selectedProject.date,
	).toLocaleDateString(navigator.language, dateFormatOptions);

	function handleAddNewTask() {
		onAddNewTask(newTaskRef.current.value, selectedProject.title);
		newTaskRef.current.value = '';
	}

	return (
		<div className="w-[35rem] mt-16">
			<header className="pb-4 mb-4 border-b-2 border-stone-300">
				<div className="flex items-center justify-between">
					<h1 className="text-3xl font-bold text-stone-600 mb-2">
						{selectedProject.title}
					</h1>
					<menu className="flex items-center gap-4 my-4">
						<li>
							<button
								type="button"
								onClick={() =>
									onDeleteProject(selectedProject.title)
								}
								className="text-stone-800 hover:text-stone-950"
							>
								Delete
							</button>
						</li>
						<li>
							<button
								type="button"
								onClick={onCancelProject}
								className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
							>
								Cancel
							</button>
						</li>
					</menu>
				</div>
				<p className="mb-4 text-stone-400">
					Due: {formattedProjectDate}
				</p>
				<p className="text-stone-600 whitespace-pre-wrap">
					{selectedProject.description}
				</p>
			</header>
			<NewTask ref={newTaskRef} onAddTask={handleAddNewTask} />
			{!selectedProjectTasks && (
				<p>No tasks available for this project.</p>
			)}
			{selectedProjectTasks && (
				<section>
					<ul className="p-4 mt-2 rounded-md">
						{selectedProjectTasks.map((task, index) => {
							return (
								<li
									className="flex justify-between my-4 bg-stone-100 p-2"
									key={index}
								>
									{task}
									<button
										onClick={() =>
											onDeleteTask(
												task,
												selectedProject.title,
											)
										}
										className="text-stone-700 hover:text-red-500"
									>
										Clear
									</button>
								</li>
							);
						})}
					</ul>
				</section>
			)}
		</div>
	);
}
