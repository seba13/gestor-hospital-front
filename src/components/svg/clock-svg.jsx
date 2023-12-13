const Clock = props => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' {...props} width={'100%'} height={'100%'}>
			<path stroke='#fff' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 12h4l3 7 4-14 3 7h4' />
		</svg>
	);
};

export default Clock;
