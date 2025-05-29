import styles from "./TaskList.module.css"
import { useState } from 'react'
import { EditModal } from "../EditModal/EditModal";

export const TaskListLayout = ({ isLoading, tasks, setTaskToEdit: onEdit, handleDeleteButton }) => {

	const [editingTask, setEditingTask] = useState(null);

	const handleEdit = (id) => {
		console.log(id);

		const taskToEdit = tasks.find(t => t.id === id);

		setEditingTask(taskToEdit);
		onEdit(taskToEdit);
	};

	const handleSave = (updatedTask) => {
		if (updatedTask) {
			fetch(`http://localhost:5703/tasks/${updatedTask.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(updatedTask),
			})
				.then(res => res.json())
				.then(savedTask => {
					onEdit(savedTask); // обновляем глобальное состояние
					setEditingTask(null);
				});
		}
	};

	return (
		<>
			<div className={styles.tasks_list}>
				<h2>Список задач:</h2>
				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					tasks.map(({ id, completed, type, text }) => (
						<div key={id} className={styles.task_item}>
							<div className={styles.task_item__main_content}>
								{/* Чекбокс */}
								<form className={styles.checkbox_form}>
									<input
										className={styles.checkbox_form__checkbox}
										type="checkbox"
										id={id}
										checked={completed}
										readOnly
									/>
									{/* <label htmlFor={id}></label> */}
								</form>

								{/* Текст задачи */}
								<span className={styles.task_item__text}>{text}</span>

								{/* Кнопки справа */}
								<div className={styles.task_item__buttons}>
									<button className={styles.task_item__edit_button} type="button"
										onClick={() => handleEdit(id)}
									>
										<img
											src="/pic/pic_edit.png"
											alt="Редактировать"
											className={styles.edit_icon}
										/>
									</button>
									<button
										className={styles.task_item__delete_button}
										type="button"
										onClick={() => handleDeleteButton(id)}
									>
										Удалить
									</button>
								</div>
							</div>
						</div>
					))



				)}
			</div>

			{
				editingTask && (
					<EditModal
						task={editingTask}
						onSave={(newText) => {
							setEditingTask({ ...editingTask, text: newText });
							handleSave(newText);
						}}
						onClose={() => setEditingTask(null)}
					/>
				)
			}
		</>

	);
};
