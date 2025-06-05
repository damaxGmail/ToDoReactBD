import { useState, useEffect } from 'react';
import { TaskListLayout } from './TaskListLayout'

import { ref, remove, set } from 'firebase/database'
import { db } from '../../firebase'

export const TaskList = ({ tasks, deleteTask, setTaskToEdit, isSorted }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [sortedTasks, setSortedTasks] = useState(tasks);
	const [editingTask, setEditingTask] = useState(null);

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


	const handleEdit = (id) => {

		const taskToEdit = tasks.find(t => t.id === id);
		if (taskToEdit) {
			setEditingTask(taskToEdit);
			setTaskToEdit(taskToEdit);
		}
	};

	const handleSave = (updatedTask) => {
		console.log('handleSave ' + updatedTask);
		if (!updatedTask || !updatedTask.id) return;

		//свой хук ???
		const editOurTask = ref(db, `tasks/${updatedTask.id}`);
		set(editOurTask, {
			text: updatedTask.text,
			completed: updatedTask.completed,
			type: updatedTask.type
		})
			.then(() => {
				setTaskToEdit(updatedTask);
				setEditingTask(null);
			})
			.catch(err => {
				console.error('Не удалось обновить задачу:', err);
			});


	};

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

			handleEdit={handleEdit}
			handleSave={handleSave}
			deleteTask={deleteTask}
			editingTask={editingTask}
			setEditingTask={setEditingTask}
			setTaskToEdit={setTaskToEdit}
			handleDeleteButton={handleDeleteButton}
		/>
	);
};
