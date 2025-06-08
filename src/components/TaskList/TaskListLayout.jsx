import styles from "./TaskList.module.css"
import { useState } from 'react'
import { EditModal } from "../EditModal/EditModal";

import { useEditTask } from '../../hooks';

export const TaskListLayout = ({ isLoading, tasks, setTaskToEdit: onEdit, handleDeleteButton }) => {

	const [editingTask, setEditingTask] = useState(null);

	const { EditTask } = useEditTask();

	const handleEdit = (id) => {
		if (!id) return;

		const taskToEdit = tasks.find(t => t.id === id);

		setEditingTask(taskToEdit);
		onEdit(taskToEdit);
	};

	const handleSave = (updatedText) => {

		const updatedTask = {
			...editingTask,
			text: updatedText
		};

		if (updatedTask && updatedTask.id) {

			EditTask(editingTask.id, updatedTask)
				.then(res => {
					if (!res.ok) throw new Error('Ошибка сохранения');
					return res.json();
				})
				.then(() => {
					onEdit(updatedTask); // обновляем глобальное состояние
					setEditingTask(null);
				})
				.catch(err => {
					console.error('Не удалось обновить задачу:', err);
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
									//onClick={() => onEdit(id)}
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
