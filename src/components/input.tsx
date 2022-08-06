interface Props {
	newTodo: string;
	handleChange: (name: string) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const Input = ({ newTodo, handleChange, handleSubmit }: Props) => {
	return (
		<form
			className='flex items-center px-6 w-full rounded-lg bg-white dark:bg-dark-desaturated-blue'
			onSubmit={e => handleSubmit(e)}
		>
			<button
				type='submit'
				className='relative mr-4 border aspect-square rounded-full h-6 w-6 border-light-gray-blue-100 dark:border-dark-gray-blue-300 hover:bg-gradient-to-b hover:from-check-background-start hover:to-check-background-end'
			>
				<div className='h-[90%] w-[90%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-dark-desaturated-blue rounded-full'></div>
			</button>
			<input
				type='text'
				value={newTodo}
				required
				placeholder='Create a new todo...'
				onChange={e => handleChange(e.target.value)}
				className='py-4 font-bold text-sm w-full text-light-gray-blue-300 outline-none dark:bg-dark-desaturated-blue dark:text-dark-gray-blue-200 dark:placeholder:text-dark-gray-blue-200 lg:text-lg'
			/>
		</form>
	);
};
