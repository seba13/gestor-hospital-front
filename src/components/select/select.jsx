import styles from './select.module.css';

const Select = ({ list, selectOption }) => {
	const onHandleClickOption = e => {
		if (e.target.closest('li')) {
			const value = e.target.closest('li').dataset.value;
			const id = e.target.closest('li').id;

			selectOption({ value, id });
		}
	};

	return (
		<ul className={styles.select} onClick={onHandleClickOption}>
			{list.map((el, index) => {
				return (
					<li key={index} data-value={el.data} id={el.id}>
						{el.data}
					</li>
				);
			})}
		</ul>
	);
};

export default Select;
