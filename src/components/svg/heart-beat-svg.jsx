const HeartBeat = props => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' {...props} width={'100%'} height={'100%'} viewBox="100 0 800 600"> 
			<g className='pathdraw'>
				<title>{'Pulse Heart'}</title>
				<path d='M162.5 299.2 305 299l8-23 11 23h34l14-109 14 226 12-118h30l5-15h10l7-16 10 31h155' />
			</g>
		</svg>
	);
};

export default HeartBeat;
