import { useState, useEffect } from 'react';
import styles from './TaskList.module.css';

const TaskListLayout = ({ isLoading, task }) => {
	return (
		<div className={styles.tasks_list}>
			<h2>Список задач:</h2>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				task.map(({ id, completed, type, text }) => (

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
							<button className={styles.task_item__delete_button}>Удалить</button>
						</div>
					</div>

				))
			)}
		</div>
	);
};

export const TaskList = ({ isLoading, task }) => {
	return (
		<TaskListLayout
			isLoading={isLoading}
			task={task}
		/>
	);
};
