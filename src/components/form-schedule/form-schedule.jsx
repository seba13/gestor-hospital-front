import DropDownSVG from '../svg/drop-down-svg.jsx';
import DateSVG from '../svg/calendar-svg.jsx';
// import IdSVG from '../svg/id-svg.jsx';
import styles from './form-schedule.module.css';
import List from '../list/list.jsx';

// import DateSchedule from '../date-schedule/date-schedule.jsx';
import { useEffect, useState } from 'react';
import StepForm from '../step-form/step-form.jsx';
import useOpenScheduleForm from '../../hooks/use-open-schedule.js';
import useEspecialties from '../../hooks/use-especialties.js';
import ButtonDate from '../button-date/button-date.jsx';
import DoctorSVG from '../svg/doctor-svg.jsx';

const Formschedule = () => {
	const { hideSchedule, isSelectedOption, onHandleClickschedule, selectOption, openStepForm } = useOpenScheduleForm();
	const [endPointMedicosEspecialidad, setEndPointMedicosEspecialidad] = useState('');

	const { specialties } = useEspecialties();

	useEffect(() => {
		document.querySelector(`.${styles['schedule-form']}`).classList.add(`${styles['fade-in']}`);
		return () => {
			document.querySelector(`.${styles['schedule-form']}`).classList.remove(`${styles['fade-in']}`);
		};
	}, []);

	return (
		<form className={styles['schedule-form']}>
			{/* LISTA ESPECIALIDADES */}
			<List
				LeftSVG={DoctorSVG}
				RightSVG={DropDownSVG}
				defaultValue={'ESPECIALIDAD'}
				// endPoint={'http://192.168.0.18:80/medicos/especialidades'}
				listElements={specialties}
				isSelectedOption={isSelectedOption}
				setEndPoint={setEndPointMedicosEspecialidad}
			></List>

			{/* BOTON DATE QUE ABRE MODAL */}
			<ButtonDate
				LeftIconSVG={DateSVG}
				title={'Seleccionar Medico'}
				RightIconSVG={DropDownSVG}
				onHandleClickButton={onHandleClickschedule}
				openClass={selectOption && openStepForm}
			></ButtonDate>

			{selectOption && openStepForm && (
				<StepForm hideSchedule={hideSchedule} endPointMedicosEspecialidad={endPointMedicosEspecialidad}></StepForm>
			)}
		</form>
	);
};

export default Formschedule;
