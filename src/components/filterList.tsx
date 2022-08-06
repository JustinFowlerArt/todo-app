import { Filter } from './filter';

interface Props {
	filter: string;
	setFilter: React.Dispatch<React.SetStateAction<string>>;
}

export const FilterList = ({ filter, setFilter }: Props) => {
	return (
		<div className='flex space-x-6 justify-center w-full py-4 rounded-lg bg-white dark:bg-dark-desaturated-blue shadow-lg shadow-light-gray-blue-100 dark:shadow-black lg:shadow-none lg:py-0 lg:w-auto'>
			<Filter name='All' filter={filter} setFilter={setFilter} />
			<Filter name='Active' filter={filter} setFilter={setFilter} />
			<Filter name='Completed' filter={filter} setFilter={setFilter} />
		</div>
	);
};
