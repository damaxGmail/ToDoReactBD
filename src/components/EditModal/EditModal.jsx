import styles from './EditModal.module.css';

export const EditModal = ({ task, newText, setNewText, onSave, onClose }) => {

	return (
		<div className={styles.modalOverlay}>
			<form className={styles.deleteModal} onSubmit={onSave}>
				<h3 className={styles.deleteModal__question}>Редактировать задачу:</h3>
				<input
					type="text"
					value={newText}
					onChange={(e) => setNewText(e.target.value)}
					className={styles.deleteModal__input}
				/>
				<div className={styles.deleteModal__buttons}>
					<button type="button" onClick={onClose} className={styles.deleteModal__button}>
						Отмена
					</button>
					<button type="submit" className={`${styles.deleteModal__button} ${styles.deleteModal__confirmButton}`}>
						Сохранить
					</button>
				</div>
			</form>
		</div>
	);
};
