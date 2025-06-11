// import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import styles from './App.module.css';
import { useState, useEffect } from 'react';

import { NewTask } from './components/NewTask/NewTask'
import { TaskList } from './components/TaskList/TaskList'
import { Filtrs } from './components/Filtrs/Filtrs'

import { useAllTasks } from '/src/hooks';

import { Routes, Route, Link } from 'react-router-dom'
import { MainPage } from './Pages/MainPage/MainPage'
import { TaskCard } from './Pages/TaskCard/TaskCard'
import { Page404 } from './Pages/Page404/Page404'


function LayoutApp({ children }) {

	return (
		<>
			<div className={styles.appContainer}>

				{children}

			</div>

		</>
	)
}
function App() {
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

	return (
		<Routes>
			<Route
				path="/"
				element={
					<LayoutApp>
						<MainPage tasks={filteredTasks}
							loading={loading}
							addTask={addTask}
							setTaskToEdit={setTaskToEdit}
							deleteTask={deleteTask}
							toggleSort={toggleSort}
							isSorted={isSorted}
							onSearch={handleSearch} />
					</LayoutApp>

				}
			/>

			<Route path="/task/:id" element={<TaskCard
				tasks={tasks}
				setTaskToEdit={setTaskToEdit}
				deleteTask={deleteTask}
			/>} />
			<Route path="*" element={<Page404 />} />

		</Routes>
	);
}
export default App
