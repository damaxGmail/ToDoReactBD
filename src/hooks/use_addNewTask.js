import { useState } from 'react';

export const use_addNewTask = () => {

	const [taskText, setTaskText] = useState('');

	const handleInputChange = (e) => {
		setTaskText(e.target.value);
	};

	const addNewTask = (newTask) => {
		fetch('http://localhost:5703/tasks', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newTask),
		})
			.then(res => res.json());
	};

	// const addNewTask = (addTask, newTask) => {
	// 	fetch('http://localhost:5703/tasks', {
	// 		method: 'POST',
	// 		headers: { 'Content-Type': 'application/json' },
	// 		body: JSON.stringify(newTask),
	// 	})
	// 		.then(res => res.json())
	// 		.then(savedTask => {
	// 			addTask(savedTask);
	// 		});
	// }
	return {
		taskText,
		setTaskText,
		handleInputChange,
		addNewTask
	}
}
