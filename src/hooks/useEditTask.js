export const useEditTask = () => {

	const EditTask = (id, updatedTask) => {
		if (!id || !updatedTask || !updatedTask.text) {
			return Promise.reject(new Error('Неверные данные для редактирования'));
		}

		return fetch(`http://localhost:5703/tasks/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				text: updatedTask.text,
				completed: updatedTask.completed,
				type: updatedTask.type
			}),
		})
	}

	return { EditTask };
}
