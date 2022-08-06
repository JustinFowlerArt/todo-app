interface Props {
	changeTheme: () => void;
	theme: string;
}

export const Header = ({ changeTheme, theme }: Props) => {
	return (
		<header className='relative flex flex-col items-center w-full'>
			<div className='flex justify-between relative z-10 px-6 pt-12 w-full max-w-xl lg:pt-20 lg:pb-5'>
				<h1 className='text-3xl font-bold tracking-[.3em] text-light-gray-blue-100 lg:text-4xl'>
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
				<>
					<img
						src='/images/bg-mobile-dark.jpg'
						className='absolute top-0 sm:hidden'
					/>
					<img
						src='/images/bg-desktop-dark.jpg'
						className='absolute top-0 hidden sm:block'
					/>
				</>
			) : (
				<>
					<img
						src='/images/bg-mobile-light.jpg'
						className='absolute top-0 sm:hidden'
					/>
					<img
						src='/images/bg-desktop-light.jpg'
						className='absolute top-0 hidden sm:block'
					/>
				</>
			)}
		</header>
	);
};
