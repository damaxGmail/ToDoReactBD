import { FiltrsLayout } from './FiltrsLayout';

export const Filtrs = () => {


	const handleSortTaks = (e) => {
		e.preventDefault(); // отключаем перезагрузку страницы
		console.log('Процесс сортировки');
	}

	const handleFindTaks = (e) => {
		e.preventDefault(); // отключаем перезагрузку страницы

		console.log('Процесс поиска');
	}

	return (
		<FiltrsLayout
			handleSortTaks={handleSortTaks}
			handleFindTaks={handleFindTaks}
		/>

	);
}

export default Filtrs;
