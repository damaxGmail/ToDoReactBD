
import styles from './TaskCard.module.css';
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useEditTask } from '../../hooks';
import { EditModal } from '../../components/EditModal/EditModal';

export const TaskCard = ({ tasks, setTaskToEdit, deleteTask }) => {

	const [currentTask, setCurrentTask] = useState(null);

	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		if (id === undefined) return;

		const task = tasks.find(t => t.id === id);

		if (!task) {
			return;
		}
		setCurrentTask(task);

	}, [id, tasks, navigate]);

	const [editingTask, setEditingTask] = useState(null);


	const { EditTask } = useEditTask();

	const handleEdit = () => {
		if (!currentTask) return;
		setEditingTask(currentTask);
	};

	const handleSave = (newText) => {
		if (!editingTask) return;

		const updatedTask = {
			...editingTask,
			text: newText
		};

		EditTask(id, updatedTask)
			.then(() => {
				setTaskToEdit(updatedTask);
				setEditingTask(null);
			})
			.catch(err => console.error('Ошибка при сохранении:', err));
	};


	const handleDelete = () => {
		deleteTask(id);
		navigate(`/`)
	};


	return (
		<>
			<div>
				<h2>Задача: {id}</h2>

				{/* Кнопки справа */}
				<div className={styles.task_item__buttons}>
					{currentTask ? (
						<>
							<span className={styles.task_item__text}> {currentTask.text} </span>

							<button className={styles.task_item__edit_button} type="button"
								onClick={handleEdit}
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
								onClick={() => {
									deleteTask(id);
									navigate('/');
								}}
							>
								Удалить
							</button>
						</>
					) : (
						<p>Задача не найдена</p>
					)}
				</div>
				<a href="/" className={styles.error_home_link}>
					← Вернуться на главную
				</a>
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
