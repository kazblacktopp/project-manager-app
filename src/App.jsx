import { useRef, useState } from 'react';
import NoProjectSelected from './components/NoProjectSelected';
import ProjectsSidebar from './components/ProjectsSidebar';
import NewProject from './components/NewProject';
import Tasks from './components/Tasks';

export default function App() {
	const [projectData, setProjectData] = useState({
		selectedProjectId: undefined,
		projects: [],
		projectTasks: {},
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

	function handleAddNewTask(task, projectId) {
		let updatedProjectTasks = [
			...(projectData.projectTasks[projectId] ?? []),
		];

		if (updatedProjectTasks) {
			updatedProjectTasks.push(task);
		} else {
			updatedProjectTasks = [task];
		}

		setProjectData(prevProjectData => {
			const updatedProjectData = {
				...prevProjectData,
				projectTasks: {
					...prevProjectData.projectTasks,
					[projectId]: updatedProjectTasks,
				},
			};

			return updatedProjectData;
		});
	}

	function handleDeleteTask(selectedTask, selectedProjectId) {
		const selectedProjectTasks =
			projectData.projectTasks[selectedProjectId];
		const updatedTaskList = selectedProjectTasks.filter(
			task => task != selectedTask,
		);

		setProjectData(prevProjectData => {
			return {
				...prevProjectData,
				projectTasks: {
					...prevProjectData.projectTasks,
					[selectedProjectId]: updatedTaskList,
				},
			};
		});
	}

	function handleProjectSelection(selectedProject) {
		setProjectData(prevProjectData => {
			return {
				...prevProjectData,
				selectedProjectId: selectedProject.title,
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

	function handleCancelProject() {
		setProjectData(prevProjectData => {
			return {
				...prevProjectData,
				selectedProjectId: undefined,
			};
		});
		setValueIsValid(true);
	}

	function handleDeleteProject(projectId) {
		// Todo: Add delete confirmation check (modal)

		setProjectData(prevProjectData => {
			const updatedProjects = prevProjectData.projects.filter(
				project => project.title != projectId,
			);

			const updatedProjectTasks = {
				...prevProjectData.projectTasks,
			};

			delete updatedProjectTasks[projectId];

			return {
				...prevProjectData,
				selectedProjectId: undefined,
				projects: updatedProjects,
				projectTasks: updatedProjectTasks,
			};
		});
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

	let content = (
		<Tasks
			selectedProject={
				projectData.projects.filter(
					project => project.title === projectData.selectedProjectId,
				)[0]
			}
			selectedProjectTasks={
				projectData.projectTasks[projectData.selectedProjectId]
			}
			onDeleteProject={handleDeleteProject}
			onCancelProject={handleCancelProject}
			onAddNewTask={handleAddNewTask}
			onDeleteTask={handleDeleteTask}
		/>
	);

	if (projectData.selectedProjectId === null) {
		content = (
			<NewProject
				ref={newProjectInputRef}
				onProjectSave={handleNewProjectSubmit}
				onCancel={handleCancelProject}
			/>
		);
	}

	if (projectData.selectedProjectId === undefined) {
		content = <NoProjectSelected onAddProject={handleAddNewProject} />;
	}

	return (
		<main className="h-screen my-8 flex gap-8">
			<ProjectsSidebar
				projects={projectData.projects}
				onAddProject={handleAddNewProject}
				onSelectProject={handleProjectSelection}
			/>
			{content}
			{!valueIsValid && (
				<p className="text-red-600">The input is NOT valid!</p>
			)}
		</main>
	);
}

