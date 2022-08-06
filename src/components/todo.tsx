import { useState } from 'react';
import useClickedOutside from '../hooks/useClickedOutside';
import { iTodo } from './todoList';

interface Props {
	todo: iTodo;
	index: number;
	handleRename: (id: number, name: string) => void;
	handleComplete: (id: number) => void;
	handleDelete: (id: number) => void;
	handleDragStart: (index: number) => void;
	handleDragEnter: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
	handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
	handleDrop: () => void;
}

export const Todo = ({
	todo,
	index,
	handleRename,
	handleComplete,
	handleDelete,
	handleDragStart,
	handleDragEnter,
	handleDragLeave,
	handleDrop,
}: Props) => {
	const [renaming, setRenaming] = useState(false);
	const [updated, setUpdated] = useState(false);
	const [newName, setNewName] = useState(todo.name);

	const handleChange = (name: string) => {
		setNewName(name);
	};

	const toggleUpdated = () => {
		handleRename(todo.id, newName);
		setUpdated(!updated);
	};

	const ref = useClickedOutside(renaming, setRenaming, toggleUpdated);

	return (
		<div
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
				<div className='mr-4' onClick={() => handleComplete(todo.id)}>
					<button
						className={`relative flex items-center justify-center rounded-full h-6 w-6 ${
							todo.completed
								? 'bg-gradient-to-b from-check-background-start to-check-background-end'
								: 'border border-light-gray-blue-100 dark:border-dark-gray-blue-300 hover:bg-gradient-to-b hover:from-check-background-start hover:to-check-background-end'
						}`}
					>
						{todo.completed ? (
							<img src='/images/icon-check.svg' />
						) : (
							<div className='h-[90%] w-[90%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-dark-desaturated-blue rounded-full'></div>
						)}
					</button>
				</div>
				<div ref={ref}>
					{renaming ? (
						<input
							type='text'
							value={newName}
							onChange={e => handleChange(e.target.value)}
							className='w-full text-light-gray-blue-300 outline-none dark:bg-dark-desaturated-blue dark:text-dark-gray-blue-200 dark:placeholder:text-dark-gray-blue-200'
						></input>
					) : (
						<span
							onClick={() => {
								setRenaming(true);
							}}
							className={`${
								todo.completed &&
								'line-through text-light-gray-blue-200 dark:text-dark-gray-blue-200'
							}`}
						>
							{todo.name}
						</span>
					)}
				</div>
			</div>
			<button onClick={() => handleDelete(todo.id)}>
				<img
					className='h-3.5 w-3.5 lg:hidden group-hover:block'
					src='/images/icon-cross.svg'
				></img>
			</button>
		</div>
	);
};
