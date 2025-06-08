// import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import styles from './App.module.css';
import { useState, useEffect } from 'react';

import { NewTask } from './components/NewTask/NewTask'
import { TaskList } from './components/TaskList/TaskList'
import { Filtrs } from './components/Filtrs/Filtrs'

import { useAllTasks } from '/src/hooks';

function LayoutApp({ tasks, loading,
	addTask,
	setTaskToEdit,
	deleteTask,
	toggleSort, isSorted, onSearch }) {

	return (
		<>
			<div className={styles.appContainer}>
				<div className={styles.Header}>
					<h1>Создание и работа со списком</h1>
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
			</div>

		</>
	)
}
function App() {
	// const [tasks, setTasks] = useState([]);
	// const [loading, setLoading] = useState(false);
	const { tasks, loading, setTasks } = useAllTasks();

	const [taskToEdit, setTaskToEdit] = useState(null);
	const [isSorted, setIsSorted] = useState(false);

	const [searchQuery, setSearchQuery] = useState('');
	const [filteredTasks, setFilteredTasks] = useState([]);

	//npx json-server@0.17.4 --watch src/json/archivTasks.json --port 5703

	useEffect(() => {
		let result = [...tasks];

		if (searchQuery.trim()) {
			result = result.filter(task =>
				task.text.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		if (isSorted) {
			result = [...result].sort((a, b) =>
				a.text.localeCompare(b.text)
			);
		}
		setFilteredTasks(result);

	}, [tasks, isSorted, searchQuery]);

	useEffect(() => {
		if (!taskToEdit) return;

		setTasks(prev =>
			prev.map(task => (task.id === taskToEdit.id ? taskToEdit : task))
		);
	}, [taskToEdit]);


	const handleSearch = (query) => {
		setSearchQuery(query);
	};

	const toggleSort = () => {
		setIsSorted(prev => !prev);
	};

	const addTask = (newTask) => {
		setTasks([...tasks, newTask]);
	};

	const editTask = (id) => {
		const task = tasks.find(t => t.id === id);

		if (task) {
			setTaskToEdit(task);
		}
	};

	const deleteTask = (id) => {
		setTasks(tasks.filter(task => task.id !== id));
	};

	return <LayoutApp
		tasks={filteredTasks}
		loading={loading}
		addTask={addTask}
		setTaskToEdit={setTaskToEdit}
		deleteTask={deleteTask}
		toggleSort={toggleSort}
		isSorted={isSorted}
		onSearch={handleSearch}
	/>;

}
export default App
