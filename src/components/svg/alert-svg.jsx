const alertSVG = props => (
	<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' {...props} width={'100%'} height={'100%'}>
		<path
			fill='#fff'
			d='m10.25 5.147-6.6 11.882C2.908 18.362 3.871 20 5.396 20H18.6c1.525 0 2.49-1.638 1.749-2.971L13.747 5.147c-.762-1.372-2.735-1.372-3.497 0Z'
			opacity={0.1}
		/>
		<path stroke='#fff' strokeLinecap='round' strokeWidth={2} d='M12 10v3M12 16v-.011' />
		<path
			stroke='#fff'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={2}
			d='M10.252 5.147 3.65 17.029C2.91 18.362 3.874 20 5.399 20H18.6c1.525 0 2.489-1.638 1.748-2.971l-6.6-11.882c-.763-1.372-2.736-1.372-3.498 0Z'
		/>
	</svg>
);
export default alertSVG;
