import { useState, useEffect } from 'react'
// import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

import { NewTask } from './components/NewTask/NewTask'
import { TaskList } from './components/TaskList/TaskList'

const OLD_TASKES = [
	{
		"id": 1,
		"completed": false,
		"type": "CreateOrder",
		"text": "Создать новый заказ"
	},
	{
		"id": 2,
		"completed": false,
		"type": "SendReport",
		"text": "Отправить отчет"
	},
	{
		"id": 3,
		"completed": false,
		"type": "MakePay",
		"text": "Оформить оплату"
	}
]


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

		new Promise((resolve) => {
			setTimeout(() => {
				resolve({ json: () => OLD_TASKES });
			}, 2500);
		})
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
