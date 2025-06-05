import { useState, useEffect } from 'react';
import { TaskListLayout } from './TaskListLayout'

import { ref, remove } from 'firebase/database'
import { db } from '../../firebase'

export const TaskList = ({ tasks, deleteTask, setTaskToEdit, isSorted }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [sortedTasks, setSortedTasks] = useState(tasks);

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


		//свой хук ???
		const taskDelete = ref(db, `tasks/${id}`);
		remove(taskDelete);

	}

	return (
		<TaskListLayout
			isLoading={isLoading}

			tasks={isSorted ? sortedTasks : tasks}

			setTaskToEdit={setTaskToEdit}

			deleteTask={deleteTask}
			handleEditButton={handleEditButton}
			handleDeleteButton={handleDeleteButton}
		/>
	);
};
