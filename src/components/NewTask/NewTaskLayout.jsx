import styles from './NewTask.module.css';

export const NewTaskLayout = ({ taskText, onInputChange, onSubmit }) => {
	return (
		<div className={styles.root}>
			<form className={styles.create_task_block} onSubmit={onSubmit}>
				<input
					name="taskName"
					className={styles.create_task_block__input}
					type="text"
					placeholder="Создайте новую задачу"
					value={taskText}
					onChange={onInputChange}
				/>
				<button
					type="submit"
					className={styles.createTaskButton}
				>
					Создать
				</button>
			</form>
		</div>
	);
};
