import styles from './EditModal.module.css';
import { useState } from 'react';

export const EditModal = ({ task, onClose, onSave }) => {
	const [text, setText] = useState(task.text);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSave(text);
	};

	return (
		<div className={styles.modalOverlay}>
			<form className={styles.deleteModal} onSubmit={handleSubmit}>
				<h3 className={styles.deleteModal__question}>
					Редактировать задачу:
				</h3>
				<input
					className={styles.deleteModal__input}
					type="text"
					value={text}
					onChange={(e) => setText(e.target.value)}
					autoFocus
				/>
				<div className={styles.deleteModal__buttons}>
					<button
						className={styles.deleteModal__button}
						type="button"
						onClick={onClose}
					>
						Отмена
					</button>
					<button
						className={`${styles.deleteModal__button} ${styles.deleteModal__confirmButton}`}
						type="submit"
					>
						Сохранить
					</button>
				</div>
			</form>
		</div>
	);
};
