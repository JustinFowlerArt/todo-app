import { useEffect, useState } from 'react';
import { Header } from './components/header';
import { TodoList } from './components/todoList';

export const App = () => {
	const [theme, setTheme] = useState('');

	useEffect(() => {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	}, []);

	const changeTheme = () => {
		if (theme === 'light') {
			setTheme('dark');
			localStorage.theme = 'dark';
		} else {
			setTheme('light');
			localStorage.theme = 'light';
		}
	};

	return (
		<div
			className={`h-screen flex flex-col items-center ${
				theme === 'dark'
					? 'dark bg-dark-blue text-dark-gray-blue-100'
					: 'bg-light-gray text-light-gray-blue-400'
			}`}
		>
			<Header changeTheme={changeTheme} theme={theme} />
			<TodoList />
		</div>
	);
};
