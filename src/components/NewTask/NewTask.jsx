import { useState } from 'react';
import { NewTaskLayout } from './NewTaskLayout';

import { useAddNewTask } from '../../hooks';


export const NewTask = ({ addTask }) => {
	const [taskText, setTaskText] = useState('');
	const handleInputChange = (e) => {
		setTaskText(e.target.value);
	};


	const { addNewTask } = useAddNewTask();


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

		addNewTask(newTask)
			.then(savedTask => {
				addTask(savedTask);
			})
			.catch(err => {
				console.error('Ошибка при добавлении задачи:', err);
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
