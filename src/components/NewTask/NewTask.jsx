import { useState } from 'react';
import { NewTaskLayout } from './NewTaskLayout';

export const NewTask = ({ addTask }) => {
	const [taskText, setTaskText] = useState('');

	const handleInputChange = (e) => {
		setTaskText(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const trimmedText = taskText.trim();

		if (!trimmedText) {
			console.log('Ошибка: текст задачи пустой');
			return;
		}

		const newTask = {
			id: Date.now().toString(),
			completed: false,
			type: 'MakeTask',
			text: trimmedText
		};

		fetch('http://localhost:5703/tasks', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newTask),
		})
			.then(res => res.json())
			.then(savedTask => {
				addTask(savedTask);
			});

		setTaskText('');
	};

	return (
		<NewTaskLayout
			taskText={taskText}
			onInputChange={handleInputChange}
			onSubmit={handleSubmit}
		/>
	);
};
