import DoctorSVG from '../svg/doctor-svg';
import DropDownSVG from '../svg/drop-down-svg';
import styles from './list-specialty.module.css';
import { useState, useEffect } from 'react';

const ListSpecialty = () => {
	const [specialty, setSpecialty] = useState('specialty');
	const [showList, setShowList] = useState(false);
	const [listSpecialty, setlistSpecialty] = useState([]);

	const toggleList = e => {
		if (showList) {
			setShowList(show => !show);
		} else if (e.target.closest(`div.${styles['form-group__specialty']}`)) {
			setShowList(show => !show);
		}
	};

	const selectList = e => {
		if (e.target.closest('li')) {
			setSpecialty(e.target.dataset.spec);
		}
	};

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(result => result.json())
			.then(json => setlistSpecialty(json.map(spec => spec.name)));
	}, []);

	useEffect(() => {
		document.body.addEventListener('click', toggleList);

		return () => {
			document.body.removeEventListener('click', toggleList);
		};
	});

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
			className={`${styles['form-group']}  ${styles['form-group__specialty']}`}
			onClick={selectList}
		>
			<span className={styles['span-svg']}>
				<DoctorSVG width={28} height={28} fill={'#fff'} />
			</span>
			<span className={styles['span-text']}>{specialty}</span>
			<span className={styles['span-svg']}>
				<DropDownSVG width={16} height={16} fill={'#fff'} />
			</span>
			{showList && (
				<ul className={styles['list-especialty']}>
					{listSpecialty.map((spec, index) => {
						return (
							<li key={index} data-spec={spec}>
								{spec}
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default ListSpecialty;
