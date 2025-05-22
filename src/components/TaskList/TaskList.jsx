import { useState } from 'react';
import styles from './TaskList.module.css';

const TaskListLayout = () => {
	return (
		<div className={styles.tasks_list} >
			{/* здесь новые списки задач */}
		</div>
	)
}
export const TaskList = () => {
	return (
		<TaskListLayout
		/>
	)
}
