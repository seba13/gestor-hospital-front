import styles from './list.module.css';
import Select from '../select/select';
import { useState } from 'react';

const List = ({ LeftSVG, RightSVG, isSelectedOption, defaultValue, listElements, setEndPoint }) => {
	const [valueList, setValueList] = useState(defaultValue);
	const [showList, setShowList] = useState(false);

	const onHandlerClick = e => {
		setShowList(!showList);
	};

	const selectOption = ({ value, id }) => {
		setValueList(value);
		if (isSelectedOption) {
			isSelectedOption({ value, id, setEndPoint });
		}
	};

	const onHandlerBlur = e => {
		setShowList(false);
	};

	return (
		<div
			className={`${styles['form-group']} ${styles['form-group__list']} `}
			onClick={onHandlerClick}
			tabIndex={0}
			onBlur={onHandlerBlur}
		>
			<span className={styles['span-svg']}>{LeftSVG && <LeftSVG width={28} height={28} fill={'#fff'} />}</span>
			<span className={styles['span-text']}>{valueList}</span>
			<span className={`${styles['span-svg']} ${styles['span-svg--drop-down']}`}>
				{RightSVG && <RightSVG width={16} height={16} fill={'#fff'} />}
			</span>
			{showList && <Select listElements={listElements} selectOption={selectOption} />}
		</div>
	);
};

export default List;
