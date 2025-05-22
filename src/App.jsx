import { useState } from 'react'

import { NewTask } from './components/NewTask/NewTask'
import { TaskList } from './components/TaskList/TaskList'

function LayoutApp({ Text }) {


	return (
		<>
			<NewTask />
			<TaskList />
		</>
	)
}

function App() {
	const Text = "Тест vite";

	return <LayoutApp
		Text={Text}
	/>;

}

export default App
