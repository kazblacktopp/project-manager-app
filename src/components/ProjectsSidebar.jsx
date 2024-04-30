import Button from './Button';

export default function ProjectsSidebar({ onAddProject }) {
	return (
		<aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
			<h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
				YOUR PROJECTS
			</h2>
			<Button onClick={onAddProject}>+ Add Project</Button>
			<ul className="mt-8">
				<li>
					<button className="w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800 text-stone-400">
						Project 1
					</button>
				</li>
				<li>
					<button className="w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800 text-stone-400">
						Project 2
					</button>
				</li>
				<li>
					<button className="w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800 text-stone-400">
						Project 3
					</button>
				</li>
			</ul>
		</aside>
	);
}
