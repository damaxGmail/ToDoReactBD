
import styles from './Page404.module.css';

export const Page404 = () => {
	return (
		<div className={styles.error_page}>
			<h1 className={styles.error_title}>Ошибка 404</h1>
			<p className={styles.error_description}>Запрашиваемая страница не найдена</p>
			<a href="/" className={styles.error_home_link}>
				← Вернуться на главную
			</a>
		</div>
	);
};
