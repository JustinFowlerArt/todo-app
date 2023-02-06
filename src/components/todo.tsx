import { useState } from 'react';
import useClickedOutside from '../hooks/useClickedOutside';
import { iTodo } from './todoList';

interface Props {
	todo: iTodo;
	index: number;
	handleUpdate: (
		id: number,
		attribute: string,
		value: boolean | string | number
	) => void;
	handleDelete: (id: number) => void;
	handleDragStart: (index: number) => void;
	handleDragEnter: (
		e: React.DragEvent<HTMLDivElement>,
		index: number
	) => void;
	handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
	handleDrop: () => void;
}

export const Todo = ({
	todo,
	index,
	handleUpdate,
	handleDelete,
	handleDragStart,
	handleDragEnter,
	handleDragLeave,
	handleDrop,
}: Props) => {
	const [renaming, setRenaming] = useState(false);
	const [newName, setNewName] = useState(todo.name);

	/**
	 * Update local state for todo name.
	 */
	const handleChange = (name: string) => {
		setNewName(name);
	};

	/**
	 * Update todo name and set renaming to false if pressing enter in name input.
	 */
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			setRenaming(false);
			handleUpdate(todo.id, 'name', newName);
		}
	};

	/**
	 * Update todo name and set renaming to false if clicked outside of renamed todo div.
	 */
	const ref = useClickedOutside(renaming, setRenaming, () =>
		handleUpdate(todo.id, 'name', newName)
	);
	return (
		<div
			data-cy='todo'
			className='flex justify-between group px-6 border-b border:light-gray-blue-200 dark:border-b-dark-gray-blue-300 cursor-move'
			draggable
			onDragStart={() => {
				handleDragStart(index);
			}}
			onDragEnter={e => {
				handleDragEnter(e, index);
			}}
			onDragLeave={e => {
				handleDragLeave(e);
			}}
			onDragEnd={() => handleDrop()}
		>
			<div className='flex items-center w-full py-4'>
				<div
					className='mr-4'
					data-cy='complete'
					onClick={() =>
						handleUpdate(todo.id, 'complete', !todo.complete)
					}
				>
					<button
						aria-label={`${
							todo.complete
								? 'Mark todo not completed'
								: 'Mark todo completed'
						}`}
						className={`relative flex items-center justify-center rounded-full h-6 w-6 ${
							todo.complete
								? 'bg-gradient-to-b from-check-background-start to-check-background-end'
								: 'border border-light-gray-blue-100 dark:border-dark-gray-blue-300 hover:bg-gradient-to-b hover:from-check-background-start hover:to-check-background-end'
						}`}
					>
						{todo.complete ? (
							<img
								src='/images/icon-check.svg'
								alt='Check mark'
							/>
						) : (
							<span className='h-[90%] w-[90%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-dark-desaturated-blue rounded-full'></span>
						)}
					</button>
				</div>
				<div ref={ref}>
					{renaming ? (
						<input
							data-cy='rename'
							type='text'
							value={newName}
							onChange={e => handleChange(e.target.value)}
							onKeyDown={e => handleKeyDown(e)}
							className='w-full text-light-gray-blue-300 outline-none dark:bg-dark-desaturated-blue dark:text-dark-gray-blue-200 dark:placeholder:text-dark-gray-blue-200'
						></input>
					) : (
						<span
							data-cy='name'
							onClick={() => {
								setRenaming(true);
							}}
							className={`${
								todo.complete &&
								'line-through text-light-gray-blue-200 dark:text-dark-gray-blue-200'
							}`}
						>
							{todo.name}
						</span>
					)}
				</div>
			</div>
			<button data-cy='delete' onClick={() => handleDelete(todo.id)}>
				<img
					className='h-3.5 w-3.5 lg:hidden group-hover:block'
					alt='Delete todo'
					src='/images/icon-cross.svg'
				></img>
			</button>
		</div>
	);
};
