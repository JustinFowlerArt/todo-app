import { useEffect, useRef, useState } from 'react';
import { FilterList } from './filterList';
import { Input } from './input';
import { Todo } from './todo';

export interface iTodo {
	id: number;
	name: string;
	complete: boolean;
	[key: string]: boolean | number | string;
}

export const todoStatuses = ['all', 'active', 'completed'];

export const TodoList = () => {
	const [firstRender, setFirstRender] = useState(true);

	const [todos, setTodos] = useState<iTodo[]>([]);
	const [newTodo, setNewTodo] = useState('');
	const [filter, setFilter] = useState('all');

	const itemsLeft = todos.filter(todo => !todo.complete).length;

	const dragItem = useRef(0);
	const dragOverItem = useRef(0);

	useEffect(() => {
		if (firstRender) {
			const localTodos = localStorage.getItem('todos');
			if (localTodos) {
				setTodos(JSON.parse(localTodos));
			}
			setFirstRender(false);
		} else {
			localStorage.setItem('todos', JSON.stringify(todos));
		}
	}, [firstRender, todos]);

	/**
	 * Update local state for new todo name.
	 */
	const handleChange = (name: string) => {
		setNewTodo(name);
	};

	/**
	 * Creates new todo named from NewTodo input field with all other attributes at default.
	 * Resets NewTodo input field.
	 */
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setTodos([
			...todos,
			{
				id: todos.length + 1,
				name: newTodo,
				complete: false,
			},
		]);
		setNewTodo('');
	};

	/**
	 * Handles updating individual todo attributes.
	 * @param id id of todo to be updated
	 * @param attribute name of attribute to be updated
	 * @param value property to assign to attribute to be updated
	 */
	const handleUpdate = (
		id: number,
		attribute: string,
		value: boolean | number | string
	) => {
		const updatedTodos = [...todos];
		const todo = updatedTodos.find(todo => todo.id === id);
		if (todo) {
			todo[attribute] = value;
		}
		setTodos(updatedTodos);
	};

	/**
	 * Delete individual todo based on id.
	 */
	const handleDelete = (id: number) => {
		const updatedTodos = todos.filter(todo => todo.id !== id);
		setTodos(updatedTodos);
	};

	/**
	 * Removes all todos that have been marked as complete.
	 */
	const handleDeleteCompleted = () => {
		const updatedTodos = todos.filter(todo => !todo.complete);
		setTodos(updatedTodos);
	};

	/**
	 * Filters results  based on filter status.
	 * @returns filtered array of todos
	 */
	const filterResults = () => {
		let results = todos;
		if (filter === 'active') {
			results = results.filter(todo => !todo.complete);
		}
		if (filter === 'completed') {
			results = results.filter(todo => todo.complete);
		}
		return results;
	};

	const handleDragStart = (index: number) => {
		dragItem.current = index;
	};

	const handleDragEnter = (
		e: React.DragEvent<HTMLDivElement>,
		index: number
	) => {
		e.currentTarget.classList.add('drop-target');
		dragOverItem.current = index;
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.currentTarget.classList.remove('drop-target');
	};

	const handleDrop = () => {
		const updatedTodos = [...todos];
		const dragItemContent = updatedTodos[dragItem.current];
		updatedTodos.splice(dragItem.current, 1);
		updatedTodos.splice(dragOverItem.current, 0, dragItemContent);
		setTodos(updatedTodos);
	};

	return (
		<main className='flex flex-col items-center relative space-y-4 p-6 w-full max-w-xl lg:space-y-6'>
			<Input
				newTodo={newTodo}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
			/>
			{todos.length > 0 && (
				<>
					<div className='flex flex-col w-full rounded-lg bg-white dark:bg-dark-desaturated-blue shadow-lg shadow-light-gray-blue-100 dark:shadow-black lg:shadow-2xl'>
						{filterResults().map((todo, index) => (
							<Todo
								key={index}
								todo={todo}
								index={index}
								handleUpdate={handleUpdate}
								handleDelete={handleDelete}
								handleDragStart={handleDragStart}
								handleDragEnter={handleDragEnter}
								handleDragLeave={handleDragLeave}
								handleDrop={handleDrop}
							/>
						))}
						<div className='flex justify-between px-6 py-4 text-sm text-light-gray-blue-300 dark:text-dark-gray-blue-200'>
							<span>
								{itemsLeft === 1
									? `${itemsLeft} item left`
									: `${itemsLeft} items left`}
							</span>
							<div className='hidden lg:block'>
								<FilterList
									filter={filter}
									setFilter={setFilter}
								/>
							</div>
							<button
								className='hover:text-dark-gray-blue-300 dark:hover:text-white'
								onClick={handleDeleteCompleted}
							>
								Clear Completed
							</button>
						</div>
					</div>
					<div className='w-full lg:hidden'>
						<FilterList filter={filter} setFilter={setFilter} />
					</div>
					<span className='font-bold py-6 text-light-gray-blue-300 dark:text-dark-gray-blue-300 lg:text-sm'>
						Drag and drop to reorder list
					</span>
				</>
			)}
		</main>
	);
};
