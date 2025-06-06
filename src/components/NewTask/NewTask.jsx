import { useState } from 'react';
import { NewTaskLayout } from './NewTaskLayout';

import { ref, push } from 'firebase/database'
import { db } from '../../firebase'

import { useAddTask } from '../../hooks/useAddTask';

export const NewTask = () => {
	const [taskText, setTaskText] = useState('');
	const { addTask } = useAddTask();

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
			//id: Date.now().toString(),
			completed: false,
			type: 'MakeTask',
			text: trimmedText
		};

		addTask(newTask);

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
