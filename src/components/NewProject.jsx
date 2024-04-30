import { forwardRef, useImperativeHandle, useRef } from 'react';

import Input from './Input';

const NewProject = forwardRef(({ onProjectSave }, ref) => {
	const titleRef = useRef(null);
	const descriptionRef = useRef(null);
	const dateRef = useRef(null);

	useImperativeHandle(
		ref,
		() => {
			return {
				get title() {
					return titleRef.current;
				},
				get description() {
					return descriptionRef.current;
				},
				get date() {
					return dateRef.current;
				},
			};
		},
		[],
	);

	return (
		<form className="w-[35rem] mt-16">
			<menu className="flex items-center justify-end gap-4 my-4">
				<li>
					<button className="text-stone-800 hover:text-stone-950">
						Cancel
					</button>
				</li>
				<li>
					<button
						type="button"
						onClick={onProjectSave}
						className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
					>
						Save
					</button>
				</li>
			</menu>
			<div>
				<Input ref={titleRef} label="TITLE" type="text" tag="input" />
				<Input
					ref={descriptionRef}
					label="DESCRIPTION"
					type="text"
					tag="textarea"
				/>
				<Input ref={dateRef} label="DUE DATE" type="date" tag="input" />
			</div>
		</form>
	);
});

export default NewProject;
