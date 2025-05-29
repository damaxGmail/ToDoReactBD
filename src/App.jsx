// import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import styles from './App.module.css';
import { useState, useEffect } from 'react';

import { NewTask } from './components/NewTask/NewTask'
import { TaskList } from './components/TaskList/TaskList'
import Filtr from './components/Filtrs/Filtrs'

function LayoutApp({ tasks, addTask, editTask, deleteTask }) {

	return (
		<>
			<div className={styles.appContainer}>
				<div className={styles.newTaskBlock}>
					<NewTask addTask={addTask} />
				</div>

				<div className={styles.mainContent}>
					<div className={styles.filtrsContainer}>
						<Filtr />
					</div>

					<div className={styles.taskListContainer}>
						<TaskList tasks={tasks} deleteTask={deleteTask} />
					</div>
				</div>
			</div>

		</>
	)
}
function App() {
	const [tasks, setTasks] = useState([]);


	//npx json-server@0.17.4 --watch src/json/archivTasks.json --port 5703
	useEffect(() => {
		fetch('http://localhost:5703/tasks')
			.then(res => res.json())
			.then(data => setTasks(data));
	}, []);

	const addTask = (newTask) => {
		setTasks([...tasks, newTask]);
	};
	const editTask = (id) => {
		setTasks(tasks.filter(task => task.id !== id));
	};
	const deleteTask = (id) => {
		setTasks(tasks.filter(task => task.id !== id));
	};

	return <LayoutApp
		tasks={tasks}
		addTask={addTask}
		editTask={editTask}
		deleteTask={deleteTask}

	/>;

}

export default App
