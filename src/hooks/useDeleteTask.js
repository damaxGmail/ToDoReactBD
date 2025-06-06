import { ref, remove } from 'firebase/database';
import { db } from '../firebase';

export const useDeleteTask = () => {
	const deleteTask = (id) => {
		const taskDelete = ref(db, `tasks/${id}`);
		remove(taskDelete);
	};

	return { deleteTask };
};
