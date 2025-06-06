import { ref, set } from 'firebase/database';
import { db } from '../firebase';

export const useEditTask = () => {
	const editTask = (updatedTask) => {
		if (!updatedTask || !updatedTask.id) return;

		const taskRef = ref(db, `tasks/${updatedTask.id}`);

		set(taskRef, {
			text: updatedTask.text,
			completed: updatedTask.completed,
			type: updatedTask.type
		})
			.then(() => {
				console.log('Задача успешно обновлена в Firebase');
			})
			.catch(err => {
				console.error('Ошибка при сохранении:', err);
			});
	};

	return { editTask };
};
