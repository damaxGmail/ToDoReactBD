import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const useAddTask = () => {
	const addTask = (newTask) => {
		const tasksRef = ref(db, 'tasks');
		push(tasksRef, newTask);
	};

	return { addTask };
};
