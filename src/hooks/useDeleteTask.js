
export const useDeleteTask = () => {

	const hookDeleteTask = (id) => {

		return fetch(`http://localhost:5703/tasks/${id}`, {
			method: 'DELETE',
		})
		// .then(() => {
		// 	deleteTask(id);
		// })
		// .catch((err) => {
		// 	console.error('Ошибка при удалении:', err);
		//
	};

	return {
		hookDeleteTask
	}

};
