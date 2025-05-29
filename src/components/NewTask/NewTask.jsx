import { useState } from 'react';
import { NewTaskLayout } from './NewTaskLayout';

export const NewTask = ({ addTask }) => {
	const [taskText, setTaskText] = useState('');

	const handleInputChange = (e) => {
		setTaskText(e.target.value);
	};

	const addNewTask = (e) => {
		e.preventDefault();
		if (taskText.trim() !== '') {
			const newTask = {
				id: Date.now().toString(),
				completed: false,
				type: 'MakeTask',
				text: taskText.trim()
			};

			fetch('http://localhost:5703/tasks', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newTask),
			})
				.then((res) => res.json())
				.then((savedTask) => {
					addTask(savedTask);
					setTaskText('');
				});
		}
	};

	return (
		<NewTaskLayout
			taskText={taskText}
			onInputChange={handleInputChange}
			onSubmit={addNewTask}
		/>
	);
};
