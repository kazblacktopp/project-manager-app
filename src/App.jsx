import { useRef, useState } from 'react';
import NoProjectSelected from './components/NoProjectSelected';
import ProjectsSidebar from './components/ProjectsSidebar';
import NewProject from './components/NewProject';

export default function App() {
	const [projectData, setProjectData] = useState({
		selectedProjectId: undefined,
		projects: [],
	});
	const [valueIsValid, setValueIsValid] = useState(true);

	const newProjectInputRef = useRef(null);

	function handleNewProjectSubmit() {
		const title = newProjectInputRef.current.title.value;
		const description = newProjectInputRef.current.description.value;
		const date = newProjectInputRef.current.date.value;

		if (!validateValueIsValid([title, description, date])) {
			setValueIsValid(false);
			return;
		}

		const newProject = {
			title,
			description,
			date,
		};

		setProjectData(prevProjectData => {
			return {
				...prevProjectData,
				selectedProjectId: newProject.title,
				projects: [...prevProjectData.projects, newProject],
			};
		});
	}

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
		setValueIsValid(true);
	}

	function validateValueIsValid(values) {
		let isValid = true;

		for (const value of values) {
			if (value.length < 1) {
				isValid = false;
				break;
			}
		}
		return isValid;
	}

	let content = <div>{projectData.selectedProjectId}</div>;

	if (projectData.selectedProjectId === null) {
		content = (
			<NewProject
				ref={newProjectInputRef}
				onProjectSave={handleNewProjectSubmit}
				onCancel={handleCancelNewProject}
			/>
		);
	}

	if (projectData.selectedProjectId === undefined) {
		content = <NoProjectSelected onAddProject={handleAddNewProject} />;
	}

	return (
		<main className="h-screen my-8 flex gap-8">
			<ProjectsSidebar onAddProject={handleAddNewProject} />
			{content}
			{!valueIsValid && <p>The input is NOT valid!</p>}
		</main>
	);
}

