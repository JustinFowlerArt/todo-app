interface Props {
	name: string;
	filter: string;
	setFilter: React.Dispatch<React.SetStateAction<string>>;
}

export const Filter = ({ name, filter, setFilter }: Props) => {
	return (
		<button
			className={`font-bold ${filter === name
					? 'text-bright-blue'
					: 'text-light-gray-blue-300 dark:text-dark-gray-blue-200 hover:text-dark-gray-blue-300 dark:hover:text-white'
				}`}
			value={name}
			onClick={e => {
				setFilter(e.currentTarget.value);
			}}
		>
			{name[0].toUpperCase() + name.substring(1)}
		</button>
	);
};
