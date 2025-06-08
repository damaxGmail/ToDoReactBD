import { useState } from 'react';

export const useAddNewTask = () => {

	const addNewTask = (newTask) => {
		return fetch('http://localhost:5703/tasks', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newTask),
		})
			.then(res => res.json()
				.catch(err => {
					console.error('Ошибка при добавлении задачи:', err);
					throw err;
				})
			);
	};

	return {
		addNewTask
	}
}
