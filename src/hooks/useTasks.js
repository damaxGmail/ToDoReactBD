import { useEffect, useState } from 'react';

export const useTasks = () => {
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch('http://localhost:3005/tasks')
			.then(res => res.json())
			.then(setTasks)
			.finally(() => setLoading(false));
	}, []);

	return { tasks, loading };
};
