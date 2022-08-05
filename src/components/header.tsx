interface Props {
	changeTheme: () => void;
	theme: string;
}
export const Header = ({ changeTheme, theme }: Props) => {
	return (
		<header className='relative'>
			<div className='flex justify-between relative z-10 px-6 pt-12'>
				<h1 className='text-3xl font-bold tracking-[.3em] text-light-gray-blue-100'>
					TODO
				</h1>
				<div onClick={() => changeTheme()}>
					{theme === 'dark' ? (
						<img src='/images/icon-sun.svg' />
					) : (
						<img src='/images/icon-moon.svg' />
					)}
				</div>
			</div>
			{theme === 'dark' ? (
				<img src='/images/bg-mobile-dark.jpg' className='absolute top-0' />
			) : (
				<img src='/images/bg-mobile-light.jpg' className='absolute top-0' />
			)}
		</header>
	);
};
