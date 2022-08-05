import { iTodo } from './todoList';

interface Props {
	todo: iTodo;
	handleComplete: (id: number) => void;
	handleDelete: (id: number) => void;
}

export const Todo = ({ todo, handleComplete, handleDelete }: Props) => {
	return (
		<div className='flex justify-between px-6 border-b border:light-gray-blue-200 dark:border-b-dark-gray-blue-300' draggable>
			<div className='flex items-center py-4'>
				<div className='mr-4 h-6 w-6' onClick={() => handleComplete(todo.id)}>
					<button
						className={`rounded-full h-full w-full ${
							todo.completed
								? 'bg-gradient-to-b from-check-background-start to-check-background-end'
								: 'border border-light-gray-blue-100 dark:border-dark-gray-blue-300'
						}`}
					>
						{todo.completed && (
							<img className='mx-auto' src='/images/icon-check.svg' />
						)}
					</button>
				</div>
				<span
					className={`${
						todo.completed && 'line-through text-light-gray-blue-200 dark:text-dark-gray-blue-200'
					}`}
				>
					{todo.name}
				</span>
			</div>
			<button onClick={() => handleDelete(todo.id)}>
				<img className='h-3.5 w-3.5' src='/images/icon-cross.svg'></img>
			</button>
		</div>
	);
};