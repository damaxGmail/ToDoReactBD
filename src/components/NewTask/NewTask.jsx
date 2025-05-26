import { useState } from 'react';
import styles from './NewTask.module.css';

const NewTaskLayout = () => {

	const [taskText, setTaskText] = useState('');

	const handleInputChange = (e) => {
		setTaskText(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault(); // отключаем перезагрузку страницы
		if (taskText.trim() !== '') {
			console.log('Добавлена задача:', taskText);
			// Здесь можно вызвать функцию для добавления задачи в общий список
			setTaskText(''); // очищаем поле ввода
		}
	};

	return (
		<div className={styles.root} >
			<form className={styles.create_task_block}>
				<input
					name="taskName"
					className={styles.create_task_block__input}
					type="text"
					placeholder="Создайте новую задачу"
					value={taskText}
					onChange={handleInputChange}
				/>
				<button
					type="submit"
					className={styles.createTaskButton}
					onClick={handleSubmit}
				>
					Создать
				</button>
			</form>
		</div >

	);
}

export const NewTask = () => {
	return (
		<NewTaskLayout
		/>
	)
}
