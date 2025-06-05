import { useState } from 'react';
import { NewTaskLayout } from './NewTaskLayout';

import { ref, push } from 'firebase/database'
import { db } from '../../firebase'

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
			//id: Date.now().toString(),
			completed: false,
			type: 'MakeTask',
			text: trimmedText
		};

		//свой хук ???
		const tasksDbRef = ref(db, 'tasks');
		push(tasksDbRef, newTask);

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
