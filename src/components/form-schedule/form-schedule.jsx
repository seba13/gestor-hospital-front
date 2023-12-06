import DropDownSVG from '../svg/drop-down-svg.jsx';
import DateSVG from '../svg/calendar-svg.jsx';
import IdSVG from '../svg/id-svg.jsx';
import styles from './form-schedule.module.css';
import List from '../list/list.jsx';
import useFetchList from '../../hooks/use-fetch-list.js';

// import DateSchedule from '../date-schedule/date-schedule.jsx';
import { useEffect, useState } from 'react';
import StepForm from '../step-form/step-form.jsx';

const Formschedule = () => {
	const [useRut, setRut] = useState('');
	const [selectOption, setSelectOption] = useState(false);
	const [endPointEspecialidad, setEndPointEspecialidad] = useState('');
	const [openStepForm, setOpenStepForm] = useState(false);

	const { data } = useFetchList('http://192.168.0.18:80/medicos/especialidades');

	useEffect(() => {
		document.querySelector(`.${styles['schedule-form']}`).classList.add(`${styles['fade-in']}`);

		return () => {
			document.querySelector(`.${styles['schedule-form']}`).classList.remove(`${styles['fade-in']}`);
		};
	}, []);

	const handleKeyDown = e => {
		if (e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Meta')
			return;

		if (
			e.target.value.length >= 8 &&
			!e.target.value.toLowerCase().includes('k') &&
			(e.key.toLowerCase() === 'k' || e.keyCode === 75)
		)
			return;

		if (isNaN(e.key)) {
			e.preventDefault();
		}

		e.target.value = e.target.value.replaceAll(' ', '');
	};

	const handleChangeInput = e => {
		let value = e.target.value.replaceAll('.', '').replaceAll('-', '');

		// dispositivos moviles Verifica si existen caracteres distintos de un numero o 'k'
		// solo permite un caracter 'k'

		const caracteres = value
			.split('')
			.reduce((acc, curr, currIndex) => {
				if (curr.toLowerCase() === 'k' && currIndex >= 7) {
					if (acc.every(caracter => caracter.toLowerCase() !== 'k')) {
						acc.push(curr.toLowerCase());
					}
					return acc;
				}

				if (isNaN(curr)) {
					return acc;
				}

				acc.push(curr.toLowerCase());
				return acc;
			}, [])
			.join([]);

		value = caracteres;

		if (value.length > 10) return;

		if (value.length === 2) {
			value = value.slice(0, 1) + '-' + value.slice(1, 2);
		} else if (value.length === 3) {
			value = value.slice(0, 2) + '-' + value.slice(2, 3);
		} else if (value.length === 4) {
			value = value.slice(0, 3) + '-' + value.slice(3, 4);
		} else if (value.length === 5) {
			value = value.slice(0, 1) + '.' + value.slice(1, 4) + '-' + value.slice(4, 5);
		} else if (value.length === 6) {
			value = value.slice(0, 2) + '.' + value.slice(2, 5) + '-' + value.slice(5, 6);
		} else if (value.length === 7) {
			value = value.slice(0, 3) + '.' + value.slice(3, 6) + '-' + value.slice(6, 7);
		} else if (value.length === 8) {
			value = value.slice(0, 1) + '.' + value.slice(1, 4) + '.' + value.slice(4, 7) + '-' + value.slice(7, 8);
		} else if (value.length === 9) {
			value = value.slice(0, 2) + '.' + value.slice(2, 5) + '.' + value.slice(5, 8) + '-' + value.slice(8, 9);
		} else if (value.length === 10) {
			value = value.slice(0, 3) + '.' + value.slice(3, 6) + '.' + value.slice(6, 9) + '-' + value.slice(9, 10);
		}

		if (value.toLowerCase().includes('k') && value[value.length - 1].toLowerCase() !== 'k') {
			value = value.replace('k', '');
		}

		setRut(value);
	};

	const isSelectedOption = ({ id }) => {
		if (id) {
			setSelectOption(true);

			setEndPointEspecialidad(`http://localhost:80/medicos/especialidad/${id}`);
		}
	};

	const onHandleClickschedule = e => {
		if (selectOption) {
			setOpenStepForm(true);
		}
	};

	const hideSchedule = () => {
		if (selectOption) {
			setOpenStepForm(false);
		}
	};

	return (
		<form className={styles['schedule-form']}>
			<label className={styles['form-group']}>
				<span className={`${styles['span-svg']} ${styles['span-svg__id-card']} `}>
					<IdSVG fill={'#fff'}></IdSVG>
				</span>
				<input
					type='text'
					maxLength={13}
					placeholder='11.111.111-1'
					className={styles['input-text']}
					value={useRut}
					onKeyDown={handleKeyDown}
					onChange={handleChangeInput}
				></input>
			</label>
			<List
				defaultValue={'ESPECIALIDAD'}
				endPoint={'http://192.168.0.18:80/medicos/especialidades'}
				data={data}
				isSelectedOption={isSelectedOption}
			></List>

			<div className={`${styles['form-group']}  ${styles['form-group__date']}`} onClick={onHandleClickschedule}>
				<span className={styles['span-svg']}>
					<DateSVG width={22} height={22} stroke={'#fff'} />
				</span>
				<span className={styles['span-text']}>FECHA</span>
				<span className={styles['span-svg']}>
					<DropDownSVG width={16} height={16} fill={'#fff'} />
				</span>
			</div>
			{/* {selectOption && openStepForm && <DateSchedule hideSchedule={hideSchedule}></DateSchedule>} */}

			{selectOption && openStepForm && (
				<StepForm hideSchedule={hideSchedule} endPointMedicosEspecialidad={endPointEspecialidad}></StepForm>
			)}

			{/* <div className={`${styles['form-group']}  ${styles['form-group__submit']}`}>
				<input type='submit' className={styles['schedule-form__submit']} value={'AGENDAR'}></input>
			</div> */}
		</form>
	);
};

export default Formschedule;
