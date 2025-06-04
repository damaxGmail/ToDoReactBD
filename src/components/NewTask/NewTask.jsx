import { useState } from 'react';
import { NewTaskLayout } from './NewTaskLayout';

//import { use_addNewTask } from './hooks';

export const NewTask = ({ addTask }) => {
	const [taskText, setTaskText] = useState('');
	const handleInputChange = (e) => {
		setTaskText(e.target.value);
	};

	// const {
	// 	taskText,
	// 	setTaskText,
	// 	handleInputChange,
	// 	addNewTask
	// } = use_addNewTask();



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



		// addNewTask(newTask)
		// 	.then(savedTask => {
		// 		addTask(savedTask);
		// 	})
		// 	.catch(err => {
		// 		console.error('Ошибка при добавлении задачи:', err);
		// 	});


		//const { addNewTask } = use_addNewTask(addTask, newTask);

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
