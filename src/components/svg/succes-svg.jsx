import './succes-svg.css';

const SuccessSVG = props => {
	return (
		<svg
			className='success-svg'
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			{...props}
			width={'100%'}
			height={'100%'}
		>
			<g fill='#1C274C'>
				<path
					className='success-check'
					d='M16.03 10.03a.75.75 0 1 0-1.06-1.06l-4.47 4.47-1.47-1.47a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l5-5Z'
				/>
				<circle 
					className='success-circle'
					cx="12" cy="12" r="10"
				/>
			</g>
		</svg>
	);
};

export default SuccessSVG;
