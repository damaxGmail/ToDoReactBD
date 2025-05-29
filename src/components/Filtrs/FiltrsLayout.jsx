import styles from './Filtrs.module.css';

export const FiltrsLayout = ({ handleSortTaks, handleFindTaks }) => {
	return (
		<div className={styles.AllFiltrs}>
			<button
				className={styles.task_item__sort_button}
				onClick={handleSortTaks}>
				Отсортировать по алфавиту
			</button>

			<button
				className={styles.task_item__find_button}
				onClick={handleFindTaks}>
				Поиск задачи
			</button>
		</div>
	)
}
