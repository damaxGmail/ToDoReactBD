import { useState, useEffect } from 'react';
import { TaskListLayout } from './TaskListLayout'

import { ref, remove, set } from 'firebase/database'
import { db } from '../../firebase'

import { useDeleteTask } from '../../hooks/useDeleteTask';
import { useEditTask } from '../../hooks/useEditTask';

export const TaskList = ({ tasks, setTaskToEdit, isSorted }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [sortedTasks, setSortedTasks] = useState(tasks);
	const [editingTask, setEditingTask] = useState(null);

	const { deleteTask } = useDeleteTask();
	const { editTask } = useEditTask();

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

		if (!updatedTask || !updatedTask.id) return;

		editTask(updatedTask);
		setTaskToEdit(null);

	};

	const handleDeleteButton = (id) => {

		deleteTask(id);
	}

	return (
		<TaskListLayout
			isLoading={isLoading}

			tasks={isSorted ? sortedTasks : tasks}

			handleEdit={handleEdit}
			handleSave={handleSave}
			editingTask={editingTask}
			setEditingTask={setEditingTask}
			setTaskToEdit={setTaskToEdit}
			handleDeleteButton={handleDeleteButton}
		/>
	);
};
