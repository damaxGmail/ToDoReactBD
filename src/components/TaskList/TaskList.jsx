import { useState, useEffect } from 'react';
import { TaskListLayout } from './TaskListLayout'

import { useDeleteTask } from '../../hooks';

export const TaskList = ({ tasks, loading, deleteTask, setTaskToEdit, isSorted }) => {

	const [sortedTasks, setSortedTasks] = useState(tasks);
	const { hookDeleteTask } = useDeleteTask();

	useEffect(() => {
		if (isSorted) {
			const sorted = [...tasks].sort((a, b) =>
				a.text.localeCompare(b.text)
			);
			setSortedTasks(sorted);
		} else {
			setSortedTasks(tasks);
		}
	}, [tasks, isSorted]);


	const handleEditButton = (id) => {
		const task = tasks.find(t => t.id === id);
		if (task) {
			// Сначинаем редактирование
			setTaskToEdit(task);
		}
	};


	const handleDeleteButton = (id) => {

		hookDeleteTask(id)
			.then(() => {
				deleteTask(id);
			})
			.catch((err) => {
				console.error('Ошибка при удалении:', err);
			});
	}

	return (
		<TaskListLayout
			isLoading={loading}

			tasks={isSorted ? sortedTasks : tasks}

			setTaskToEdit={setTaskToEdit}

			deleteTask={deleteTask}
			handleEditButton={handleEditButton}
			handleDeleteButton={handleDeleteButton}
		/>
	);
};
