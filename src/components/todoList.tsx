import { useState } from 'react';
import { FilterList } from './filterList';
import { Input } from './input';
import { Todo } from './todo';

export interface iTodo {
	id: number;
	name: string;
	completed: boolean;
}

export const TodoList = () => {
	const [todos, setTodos] = useState<iTodo[]>([]);
	const [newTodo, setNewTodo] = useState('');
	const [filter, setFilter] = useState('all');

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
		setNewTodo('');
	};

	const handleComplete = (id: number) => {
		const updatedTodos = [...todos];
		const todo = updatedTodos.find(todo => todo.id === id);
		if (todo) {
			todo.completed = !todo.completed;
		}
		setTodos(updatedTodos);
	};

	const handleCompleteAll = () => {
		const updatedTodos = todos.filter(todo => !todo.completed);
		setTodos(updatedTodos);
	};

	const handleDelete = (id: number) => {
		const updatedTodos = todos.filter(todo => todo.id !== id);
		setTodos(updatedTodos);
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

	return (
		<main className='flex flex-col items-center relative space-y-4 p-6 w-full max-w-xl lg:space-y-6'>
			<Input
				newTodo={newTodo}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
			/>
			{todos.length > 0 && (
				<>
					<div
						className='flex flex-col w-full rounded-lg bg-white dark:bg-dark-desaturated-blue shadow-lg shadow-light-gray-blue-100 lg:shadow-2xl'
						onDragOver={() => console.log('dragOver')}
					>
						{filterResults().map(todo => (
							<Todo
								key={todo.id}
								todo={todo}
								handleComplete={handleComplete}
								handleDelete={handleDelete}
							/>
						))}
						<div className='flex justify-between px-6 py-4 text-sm text-light-gray-blue-300 dark:text-dark-gray-blue-200'>
							<span>{todos && filterResults().length} items left</span>
							<div className='hidden lg:block'>
								<FilterList filter={filter} setFilter={setFilter} />
							</div>
							<button className='hover:text-dark-gray-blue-300 dark:hover:text-white' onClick={handleCompleteAll}>Clear Completed</button>
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
