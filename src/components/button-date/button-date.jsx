import { useState } from 'react';
import styles from './button-date.module.css';

const ButtonDate = ({
	LeftIconSVG,
	title = 'Button',
	RightIconSVG,
	onHandleClickButton,
	openClass,
	positionFixed,
	positionAbsolute,
	styleProps,
	buttonClassActive,
}) => {
	const [rotateSVG, setRotateSVG] = useState(false);

	return (
		<div
			style={styleProps || {}}
			className={`${styles['form-group']}  ${styles['form-group__date']}} ${styles[buttonClassActive] || ''} `}
			onClick={() => {
				onHandleClickButton && onHandleClickButton();

				// funcion que retorna bool para mover svg icon
				if (openClass) {
					setRotateSVG(openClass());
				}
			}}
		>
			<span className={styles['span-svg']}>
				{LeftIconSVG && <LeftIconSVG width={22} height={22} stroke={'#fff'} />}
			</span>
			<span className={styles['span-text']}>{title}</span>
			<span className={`${styles['span-svg']} ${styles['span-svg--drop-down']} ${(rotateSVG || '') && styles.open} }`}>
				{RightIconSVG && <RightIconSVG width={16} height={16} fill={'#fff'} />}
			</span>
		</div>
	);
};

export default ButtonDate;
