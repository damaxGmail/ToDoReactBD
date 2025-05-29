import styles from './Filtrs.module.css';

export const FiltrsLayout = ({ isSorted, toggleSort, handleFindTaks }) => {
	return (
		<>
			<div className={styles.root}>
				<div className={styles.filtrs_block}>
					<button
						type="button"
						className={`${styles.sort_button} ${isSorted ? styles.sort_button_active : ''}`}
						onClick={toggleSort}
					>
						{isSorted ? 'Не сортировать' : 'Сортировать'}
					</button>
				</div>

				<div className={styles.find_block}>
					<input
						name="findTask"
						className={styles.find_task_block__input}
						type="text"
						placeholder="Поиск..."
					// value={taskText}
					// onChange={onInputChange}
					/>
					<button className={styles.task_item__action_button} onClick={handleFindTaks}>
						{`=>`}
					</button>
				</div>
			</div>
		</>
	)
}
