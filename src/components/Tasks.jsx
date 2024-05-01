import { forwardRef } from 'react';

const Tasks = forwardRef(
	({ project, onDeleteProject, onCancelProject }, ref) => {
		const dateFormatOptions = {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		};
		const formattedProjectDate = new Date(project.date).toLocaleDateString(
			navigator.language,
			dateFormatOptions,
		);

		return (
			<div className="w-[35rem] mt-16">
				<header className="pb-4 mb-4 border-b-2 border-stone-300">
					<div className="flex items-center justify-between">
						<h1 className="text-3xl font-bold text-stone-600 mb-2">
							{project.title}
						</h1>
						<menu className="flex items-center gap-4 my-4">
							<li>
								<button
									type="button"
									onClick={() =>
										onDeleteProject(project.title)
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
						{project.description}
					</p>
				</header>
			</div>
		);
	},
);

export default Tasks;
