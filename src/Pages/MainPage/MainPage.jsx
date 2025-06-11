import styles from './MainPage.module.css';

import { NewTask } from '../../components/NewTask/NewTask';
import { Filtrs } from '../../components/Filtrs/Filtrs';
import { TaskList } from '../../components/TaskList/TaskList';

export const MainPage = (
	{ tasks,
		loading,
		addTask,
		setTaskToEdit,
		deleteTask,
		toggleSort,
		isSorted,
		onSearch
	}) => {

	return (
		<>
			<div className={styles.Header}>
				<h1>Создание и работа со списком задач</h1>
			</div>
			<div className={styles.newTaskBlock}>
				<NewTask
					addTask={addTask}
				/>
			</div>

			<div className={styles.mainContent}>
				<div className={styles.filtrsContainer}>
					<Filtrs isSorted={isSorted} toggleSort={toggleSort} onSearch={onSearch} />
				</div>

				<div className={styles.taskListContainer}>
					<TaskList tasks={tasks}
						loading={loading}
						deleteTask={deleteTask}
						setTaskToEdit={setTaskToEdit}
						isSorted={isSorted}
					/>
				</div>
			</div>
		</>
	);
};
