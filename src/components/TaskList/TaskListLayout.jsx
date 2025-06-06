import { useState, useEffect } from 'react';
import styles from './TaskList.module.css';

import { EditModal } from '../EditModal/EditModal'

export const TaskListLayout = ({
	isLoading,
	tasks,
	handleEdit,
	handleSave,
	editingTask,
	setEditingTask,
	setTaskToEdit,
	handleDeleteButton
}) => {

	const [newText, setNewText] = useState('');

	useEffect(() => {
		if (editingTask) {
			setNewText(editingTask.text);
		}
	}, [editingTask]);

	const onSave = () => {

		const updatedTask = {
			...editingTask,
			text: newText
		};
		handleSave(updatedTask);
	};

	const onClose = () => {
		setNewText('');
		setEditingTask(null);
		setTaskToEdit(null);
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
									<button
										className={styles.task_item__edit_button}
										type="button"
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

			{/* Модальное окно */}
			{editingTask && (
				<EditModal
					task={editingTask}
					newText={newText}
					setNewText={setNewText}
					onSave={onSave}
					onClose={onClose}
				/>
			)}
		</>
	);
};
