import { FiltrsLayout } from './FiltrsLayout';

export const Filtrs = ({ isSorted, toggleSort, onSearch }) => {

	return (
		<FiltrsLayout
			isSorted={isSorted}
			toggleSort={toggleSort}
			onSearch={onSearch}
		/>

	);
};


