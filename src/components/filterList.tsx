import { Filter } from './filter';
import { todoStatuses } from './todoList';

interface Props {
	filter: string;
	setFilter: React.Dispatch<React.SetStateAction<string>>;
}

export const FilterList = ({ filter, setFilter }: Props) => {
	return (
		<div className='flex space-x-6 justify-center w-full text-base py-4 rounded-lg bg-white dark:bg-dark-desaturated-blue shadow-lg shadow-light-gray-blue-100 absolute -bottom-[4.5rem] left-0 dark:shadow-black lg:static lg:text-sm lg:shadow-none lg:py-0 lg:w-auto'>
			{todoStatuses.map((item, index) => (
				<Filter
					key={index}
					name={item}
					filter={filter}
					setFilter={setFilter}
				/>
			))}
		</div>
	);
};
