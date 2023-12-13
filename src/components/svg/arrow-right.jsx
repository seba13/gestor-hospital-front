const ArrowRight = ({ props }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 22 22'
			{...props}
			width={'100%'}
			height={'100%'}
			stroke='currentcolor'
		>
			<path
				// stroke='#292D32'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeMiterlimit={10}
				strokeWidth={1.5}
				d='m8.91 19.92 6.52-6.52c.77-.77.77-2.03 0-2.8L8.91 4.08'
			/>
		</svg>
	);
};

export default ArrowRight;
