import styles from "./TaskList.module.css"
import { useState } from 'react'
import { EditModal } from "../EditModal/EditModal";

import { useNavigate } from 'react-router-dom';

export const TaskListLayout = ({ isLoading, tasks, setTaskToEdit: onEdit, handleDeleteButton }) => {

	const navigate = useNavigate();

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

								<span
									className={styles.task_item__text}
									onClick={() => navigate(`/task/${id}`)}
									style={{ cursor: 'pointer' }}
								>
									{text}
								</span>

							</div>
						</div>
					))



				)}
			</div>


		</>

	);
};
