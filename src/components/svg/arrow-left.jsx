const ArrowLeftSVG = ({ props }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
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
				d='M15 19.92 8.48 13.4c-.77-.77-.77-2.03 0-2.8L15 4.08'
			/>
		</svg>
	);
};

export default ArrowLeftSVG;
