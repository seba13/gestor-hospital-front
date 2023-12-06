import DoctorSVG from '../svg/doctor-svg';
import DropDownSVG from '../svg/drop-down-svg';
import styles from './list.module.css';
import Select from '../select/select';
import { useState } from 'react';

const List = ({ isSelectedOption, defaultValue, data }) => {
	const [valueList, setValueList] = useState(defaultValue);
	const [showList, setShowList] = useState(false);

	// const endPoint = 'http://192.168.0.18:80/medicos/especialidades';

	// const fechas = [
	// 	{ data: '12/01/23', id: '1' },
	// 	{ data: '13/01/23', id: '2' },
	// 	{ data: '14/01/23', id: '3' },
	// 	{ data: '15/01/23', id: '4' },
	// 	{ data: '16/01/23', id: '5' },
	// 	{ data: '17/01/23', id: '6' },
	// 	{ data: '18/01/23', id: '7' },
	// ];

	// if (listArr.length === 0 && endPoint !== '') {
	// 	listArr.push(...fechas);
	// }

	const onHandlerClick = e => {
		setShowList(!showList);
	};

	const selectOption = ({ value, id }) => {
		setValueList(value);

		if (isSelectedOption) {
			isSelectedOption({ value, id });
		}
	};

	const onHandlerBlur = e => {
		console.log('blur');
		setShowList(false);
	};

	// useEffect(() => {
	// 	document.body.addEventListener('click', toggleList);

	// 	return () => {
	// 		document.body.removeEventListener('click', toggleList);
	// 	};
	// });

	// const specialtys = [
	// 	'Cardiology',
	// 	'Dermatology',
	// 	'Orthopedics',
	// 	'Neurology',
	// 	'Ophthalmology',
	// 	'Pediatrics',
	// 	'Psychiatry',
	// 	'Emergency Medicin',
	// 	'Radiology',
	// 	'Otorhinolaryngology',
	// 	'Pulmonology',
	// ];

	return (
		<div
			className={`${styles['form-group']} ${styles['form-group__list']} `}
			onClick={onHandlerClick}
			tabIndex={0}
			onBlur={onHandlerBlur}
		>
			<span className={styles['span-svg']}>
				<DoctorSVG width={28} height={28} fill={'#fff'} />
			</span>
			<span className={styles['span-text']}>{valueList}</span>
			<span className={styles['span-svg']}>
				<DropDownSVG width={16} height={16} fill={'#fff'} />
			</span>
			{showList && <Select list={data} selectOption={selectOption} />}

			{/* <ul className={styles['list-especialty']}>
					{specialties.map((spec, index) => {
						return (
							<li key={index} data-spec={spec.especialidad} id={spec.id_doctor}>
								{spec.especialidad}
							</li>
						);
					})}
				</ul> */}
		</div>
	);
};

export default List;
