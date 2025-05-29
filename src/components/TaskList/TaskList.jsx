import { useState, useEffect } from 'react';
import { TaskListLayout } from './TaskListLayout'

export const TaskList = ({ tasks, editTask, deleteTask }) => {
	const [isLoading, setIsLoading] = useState(false);

	const handleEditButton = (e) => {
		e.preventDefault(); // отключаем перезагрузку страницы

		fetch(`http://localhost:5703/tasks/${id}`, {
			method: 'UPDATE',
		})
			.then(() => {
				//deleteTask(id);
			})
			.catch((err) => {
				console.error('Ошибка при редактировании:', err);
			});

	}
	const handleDeleteButton = (id) => {
		fetch(`http://localhost:5703/tasks/${id}`, {
			method: 'DELETE',
		})
			.then(() => {
				deleteTask(id);
			})
			.catch((err) => {
				console.error('Ошибка при удалении:', err);
			});
	}



	return (
		<TaskListLayout
			isLoading={isLoading}
			tasks={tasks}
			handleEditButton={handleEditButton}
			handleDeleteButton={handleDeleteButton}

		/>
	);
};
