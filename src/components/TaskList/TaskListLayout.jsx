import styles from "./TaskList.module.css"
import { useState } from 'react'
import { EditModal } from "../EditModal/EditModal";

import { ref, set } from 'firebase/database'
import { db } from '../../firebase'

export const TaskListLayout = ({ isLoading, tasks, setTaskToEdit: onEdit, handleDeleteButton }) => {

	const [editingTask, setEditingTask] = useState(null);

	const handleEdit = (id) => {

		const taskToEdit = tasks.find(t => t.id === id);

		setEditingTask(taskToEdit);
		onEdit(taskToEdit);
	};

	const handleSave = (updatedTask) => {
		if (!updatedTask || !updatedTask.id) return;

		//свой хук ???
		const editOurTask = ref(db, `tasks/${updatedTask.id}`);
		set(editOurTask, {
			text: updatedTask.text,
			completed: updatedTask.completed,
			type: updatedTask.type
		})
			.then(() => {
				onEdit(updatedTask); // обновляем локальное состояние
				setEditingTask(null);
			})
			.catch(err => {
				console.error('Не удалось обновить задачу:', err);
			});


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

							const updatedTask = {
								...editingTask,
								text: newText
							};
							setEditingTask(updatedTask);
							handleSave(updatedTask);
						}}
						onClose={() => setEditingTask(null)}
					/>
				)
			}
		</>

	);
};
