import { useState, useEffect } from 'react'
// import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

import { NewTask } from './components/NewTask/NewTask'
import { TaskList } from './components/TaskList/TaskList'

function LayoutApp({ isLoading, task }) {

	return (
		<>
			<NewTask />
			{/* <ErrorBoundary fallback={<p>Произошла ошибка в списке задач</p>}> */}
			<TaskList isLoading={isLoading} task={task} />
			{/* </ErrorBoundary> */}
		</>
	)
}

function App() {

	const [task, setTask] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch('http://localhost:3005/tasks')
			.then((loadedData) => loadedData.json())
			.then((loadedTasks) => {
				setTask(loadedTasks);
			})
			.finally(() => setIsLoading(false));
	}, []);

	return <LayoutApp

		isLoading={isLoading}
		task={task}

	/>;

}

export default App
