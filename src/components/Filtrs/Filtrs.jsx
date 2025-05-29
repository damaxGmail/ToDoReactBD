import { FiltrsLayout } from './FiltrsLayout';

export const Filtrs = ({ isSorted, toggleSort }) => {

	const handleFindTaks = (e) => {
		e.preventDefault(); // отключаем перезагрузку страницы

		console.log('Процесс поиска');
	}

	return (
		<FiltrsLayout
			isSorted={isSorted}
			toggleSort={toggleSort}
			handleFindTaks={handleFindTaks}
		/>

	);
};


