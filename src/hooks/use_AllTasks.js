import { useEffect, useState } from 'react';

export const use_AllTasks = () => {
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch('http://localhost:5703/tasks')
			.then(res => res.json())
			.then(setTasks)
			.finally(() => setLoading(false));
	}, []);

	return { tasks, loading };
};
