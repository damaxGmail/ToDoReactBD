// src/hooks/useTasks.js
import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';

export const useTasks = () => {
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const tasksDbRef = ref(db, 'tasks');

		const unsubscribe = onValue(
			tasksDbRef,
			(snapshot) => {
				const loadedTasks = snapshot.val() || {};
				const formattedTasks = Object.entries(loadedTasks).map(([key, task]) => ({
					id: key,
					...task
				}));
				setTasks(formattedTasks);
				setLoading(false);
			},
			(error) => {
				console.error('Ошибка при загрузке задач:', error);
				setLoading(false);
			}
		);

		return () => {
			unsubscribe();
		};
	}, []);

	return { tasks, loading, setTasks };
};
