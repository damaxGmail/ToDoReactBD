import styles from './TaskList.module.css';

export const TaskListLayout = ({ isLoading, tasks, handleEditButton, handleDeleteButton, handleSortTaks }) => {

	return (
		<div className={styles.tasks_list}>


			<h2>Список задач:</h2>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (

				tasks.map(({ id, completed, type, text }) => (

					<div key={id} className={styles.task_item}>
						<div className={styles.task_item__main_container}>
							<div className={styles.task_item__main_content}>
								<form className={styles.checkbox_form}>
									<input
										className={styles.checkbox_form__checkbox}
										type="checkbox"
										id={id}
										checked={completed}
										readOnly
									/>
									<label htmlFor={id}></label>
								</form>
								<span className={styles.task_item__text}>{text}</span>
							</div>
							<button
								className={styles.task_item__delete_button}
								onClick={() => handleEditButton(id)}>
								Изменить
							</button>
							<button
								className={styles.task_item__delete_button}
								onClick={() => handleDeleteButton(id)}>
								Удалить
							</button>
						</div>
					</div>

				))
			)}
		</div>
	);
};
