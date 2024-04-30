import { useRef, useState } from 'react';
import NoProjectSelected from './components/NoProjectSelected';
import ProjectsSidebar from './components/ProjectsSidebar';
import NewProject from './components/NewProject';

export default function App() {
	const [projectData, setProjectData] = useState({
		selectedProjectId: undefined,
	});

	function handleAddNewProject() {
		setProjectData(prevProjectData => {
			return {
				...prevProjectData,
				selectedProjectId: null,
			};
		});
	}

	function handleCancelNewProject() {
		setProjectData(prevProjectData => {
			return {
				...prevProjectData,
				selectedProjectId: undefined,
			};
		});
	}

	const newProjectInputRef = useRef(null);

	function handleNewProjectSubmit() {
		alert(newProjectInputRef.current.date.value);
	}

	let content = <NoProjectSelected onAddProject={handleAddNewProject} />;

	if (projectData.selectedProjectId === null) {
		content = (
			<NewProject
				ref={newProjectInputRef}
				onProjectSave={handleNewProjectSubmit}
				onCancel={handleCancelNewProject}
			/>
		);
	}

	return (
		<main className="h-screen my-8 flex gap-8">
			<ProjectsSidebar onAddProject={handleAddNewProject} />
			{content}
		</main>
	);
}

