import { useState } from 'react';

interface iTodo {
	id: number;
	name: string;
	completed: boolean;
}

export const App = () => {
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
			todo.completed = true;
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
		<div>
			<h1 id='title' className='text-3xl font-bold underline'>
				Todo
			</h1>
			<form onSubmit={e => handleSubmit(e)}>
				<button type='submit'>submit</button>
				<input
					type='text'
					value={newTodo}
					required
					onChange={e => handleChange(e.target.value)}
					className='border'
				/>
			</form>
			<div onDragOver={() => console.log('dragOver')}>
				{todos &&
					filterResults().map(todo => (
						<div key={todo.id} draggable>
							<button onClick={() => handleComplete(todo.id)}>*</button>
							<span className={`${todo.completed && 'line-through'}`}>
								{todo.name}
							</span>
							<button onClick={() => handleDelete(todo.id)}>X</button>
						</div>
					))}
			</div>
			<div>
				<span>{todos && filterResults().length} items left</span>
				<button onClick={handleCompleteAll}>Clear Completed</button>
			</div>
			<div>
				<button
					value='all'
					onClick={e => {
						setFilter(e.currentTarget.value);
					}}
				>
					All
				</button>
				<button
					value='active'
					onClick={e => {
						setFilter(e.currentTarget.value);
					}}
				>
					Active
				</button>
				<button
					value='completed'
					onClick={e => {
						setFilter(e.currentTarget.value);
					}}
				>
					Completed
				</button>
			</div>
		</div>
	);
};
