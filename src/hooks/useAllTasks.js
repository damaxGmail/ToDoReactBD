import { useEffect, useState } from 'react';

export const useAllTasks = () => {
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch('http://localhost:5703/tasks')
			.then(res => res.json())
			.then(data => setTasks(data))
			.catch(err => console.error('Ошибка загрузки:', err))
			.finally(() => setLoading(false));
	}, []);

	return { tasks, loading, setTasks };
};
