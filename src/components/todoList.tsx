import { useEffect, useRef, useState } from 'react';
import { FilterList } from './filterList';
import { Input } from './input';
import { Todo } from './todo';

export interface iTodo {
	id: number;
	name: string;
	completed: boolean;
}

export const TodoList = () => {
	const [firstRender, setFirstRender] = useState(true);

	const [todos, setTodos] = useState<iTodo[]>([]);
	const [newTodo, setNewTodo] = useState('');
	const [filter, setFilter] = useState('all');

	const itemsLeft = todos.filter(todo => !todo.completed).length;

	const dragItem = useRef(0);
	const dragOverItem = useRef(0);

	useEffect(() => {
		const localTodos = localStorage.getItem('todos');
		if (firstRender) {
			if (localTodos) {
				setTodos(JSON.parse(localTodos));
			}
			setFirstRender(false);
		}
	}, [firstRender]);

	const updateLocal = (updatedTodos: iTodo[]) => {
		localStorage.setItem('todos', JSON.stringify(updatedTodos));
	};

	const handleChange = (name: string) => {
		setNewTodo(name);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setTodos([
			...todos,
			{
				id: todos.length + 1,
				name: newTodo,
				completed: false,
			},
		]);
		updateLocal([
			...todos,
			{
				id: todos.length + 1,
				name: newTodo,
				completed: false,
			},
		]);
		setNewTodo('');
	};

	const handleRename = (id: number, name: string) => {
		const updatedTodos = [...todos];
		const todo = updatedTodos.find(todo => todo.id === id);
		if (todo) {
			todo.name = name;
		}
		setTodos(updatedTodos);
		updateLocal(updatedTodos);
	};

	const handleComplete = (id: number) => {
		const updatedTodos = [...todos];
		const todo = updatedTodos.find(todo => todo.id === id);
		if (todo) {
			todo.completed = !todo.completed;
		}
		setTodos(updatedTodos);
		updateLocal(updatedTodos);
	};

	const handleCompleteAll = () => {
		const updatedTodos = todos.filter(todo => !todo.completed);
		setTodos(updatedTodos);
		updateLocal(updatedTodos);
	};

	const handleDelete = (id: number) => {
		const updatedTodos = todos.filter(todo => todo.id !== id);
		setTodos(updatedTodos);
		updateLocal(updatedTodos);
	};

	const filterResults = () => {
		let results = todos;
		if (filter === 'active') {
			results = results.filter(todo => !todo.completed);
		}
		if (filter === 'completed') {
			results = results.filter(todo => todo.completed);
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
		updateLocal(updatedTodos);
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
								handleRename={handleRename}
								handleComplete={handleComplete}
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
								<FilterList filter={filter} setFilter={setFilter} />
							</div>
							<button
								className='hover:text-dark-gray-blue-300 dark:hover:text-white'
								onClick={handleCompleteAll}
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
