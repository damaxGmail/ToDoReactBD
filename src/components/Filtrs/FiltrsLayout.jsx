import styles from './Filtrs.module.css';
import { useState } from 'react'

export const FiltrsLayout = ({ isSorted, toggleSort, onSearch }) => {
	const [searchQuery, setSearchQuery] = useState('');

	const handleChange = (e) => {
		const query = e.target.value;
		setSearchQuery(query);
		onSearch(query);
	};

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
						value={searchQuery}
						onChange={handleChange}
					/>

				</div>
			</div>
		</>
	)
}
