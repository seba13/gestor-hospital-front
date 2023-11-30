const DateSVG = props => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={24}
		height={21}
		fill='none'
        stroke='#CCC'
		{...props}
   
	>
		<path
			
			d='M7.5 5V0m10 5V0m4 16v4.5h-18v-3m17.863-10H3.352M.5 17.25v.25h17.9l.15-.25.234-.491A28 28 0 0 0 21.5 4.729V2.5h-18v2.128A28 28 0 0 1 .743 16.744L.5 17.25Z'
		/>
	</svg>
);
export default DateSVG;
