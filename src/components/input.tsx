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
				className='mr-4 border aspect-square rounded-full h-6 w-6 border-light-gray-blue-100 dark:border-dark-gray-blue-300'
			></button>
			<input
				type='text'
				value={newTodo}
				required
				placeholder='Create a new todo...'
				onChange={e => handleChange(e.target.value)}
				className='py-4 font-bold text-sm w-full text-light-gray-blue-300 outline-none dark:bg-dark-desaturated-blue dark:text-dark-gray-blue-200 dark:placeholder:text-dark-gray-blue-200'
			/>
		</form>
	);
};
