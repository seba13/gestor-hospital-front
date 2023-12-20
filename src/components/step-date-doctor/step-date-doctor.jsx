import styles from './step-date-doctor.module.css';
// import List from '../list/list';
import useDateDoctor from '../../hooks/use-date-doctor';
import React, { useState } from 'react';

import DoctorSpecialty from '../doctor-specialty/doctor-specialty';
import ScheduleDoctor from '../input-schedule/input-schedule-doctor';
// import useFetchList from '../../hooks/use-fetch';
import CalendarSVG from '../svg/calendar-svg';
import DropDownSVG from '../svg/drop-down-svg';
import ButtonDate from '../button-date/button-date';

import InputDate from '../input-date/input-date';

// import useSaveSchedule from '../../hooks/use-save-schedule';

const StepDateDoctor = ({
	hideSchedule,
	endPointMedicosEspecialidad,
	idSelectedDoctor, // id médico seleccionado
	selectedDoctor,
	// endPointDateDoctor, // guarda enpoint en base a id id del doctor
	// endPointScheduleDoctor, // guarda enpoint eb base a id de doctor y fecha
	idSelectedSchedule, // id de cita seleccionada
	selectedSchedule, // guarda hora seleccionada
	updateData,
	idSelectedDate,
	selectedDate,
	selectedYear,
	selectedDay,
	selectedMonth,
	dayOfWeek,
	diasLaborales,
	buttonClass,
	nameDoctor,
	specialtyDoctor,
}) => {
	// estados para el inputDate
	const [openInputDate, setOpenInputDate] = useState(false);
	const [animationEndInput, setAnimationEndInput] = useState(false);
	const [closeInputDate, setCloseInputDate] = useState(false);
	const [buttonClassActive, setButtonClassActive] = useState(buttonClass || 'disabled');


	const {
		changeIdDoctor,
		changeEndPointAppointments,
		listEspecialtyDoctor,
		horarioCitasDisponibles,
		diasLaboralesMedico,
		loadingImagesDoctor,
		imageLoadedDoctor
	} = useDateDoctor({
		endPointMedicosEspecialidad,
		idSelectedDoctor,
		selectedDate,
		dayOfWeek,
		diasLaborales,
	});



	const selectDoctor = idMedico => {
		changeIdDoctor(idMedico);
	};

	const selectDate = ({ fechaCitas, idDia }) => {
		console.log({ fechaCitas, idDia, idSelectedDoctor });

		changeEndPointAppointments({ idSelectedDoctor, fechaCitas, idDia });
	};

	const handleOpenInputDate = () => {
		if (idSelectedDoctor) {
			if (!openInputDate) {
				setOpenInputDate(true);
			} else {
				setCloseInputDate(true);
			}
		}
	};

	const animationEndInputDate = () => {
		setAnimationEndInput(false);
		setCloseInputDate(false);
		setOpenInputDate(false);
	};

	const rotarSVGBoton = () => {
		if (openInputDate) return false;

		if (!openInputDate && !animationEndInput && idSelectedDoctor) return true;
	};

	const setButtonClass = () => {
		if (buttonClassActive !== 'active') {
			setButtonClassActive('active');

			updateData({ buttonClass: 'active' });
		}
	};

	return (
		<div className={styles['form-step']}>
			{!openInputDate && (
				<DoctorSpecialty
					medicosEspecialidad={listEspecialtyDoctor}
					updateData={updateData}
					selectDoctor={selectDoctor}
					idSelectedDoctor={idSelectedDoctor}
					required={true}
					nameDoctor={nameDoctor}
					speacialtyDoctor={specialtyDoctor}
					loadingImagesDoctor={loadingImagesDoctor}
					imageLoadedDoctor={imageLoadedDoctor}
				></DoctorSpecialty>
			)}

			{/* LISTADO DE FECHAS QUE ATIENDE EL DR */}
			{openInputDate && !animationEndInput && (
				<InputDate
					handleClickButtonClose={handleOpenInputDate}
					animationEndInputDate={animationEndInputDate}
					closeInputDate={closeInputDate}
					idSelectedDate={idSelectedDate}
					selectedYear={selectedYear}
					selectedDay={selectedDay}
					selectedMonth={selectedMonth}
					updateData={updateData}
					diasLaboralesMedico={diasLaboralesMedico}
					selectDate={selectDate}
					required={true}
					setButtonClass={setButtonClass}
				></InputDate>
			)}

			<ButtonDate
				LeftIconSVG={CalendarSVG}
				RightIconSVG={DropDownSVG}
				openInputDate={openInputDate}
				animationEndInput={animationEndInput}
				title={'CALENDARIO MÉDICO'}
				onHandleClickButton={handleOpenInputDate}
				openClass={rotarSVGBoton}
				positionFixed={'position__fixed'}
				// styleProps={{
				// 	position: 'absolute',
				// 	top: '0',
				// 	right: '0px',
				// 	zIndex: '260',
				// }}
				styleProps={{
					position: 'absolute',
					top: '380px',
					right: '30px',
					zIndex: '260',
				}}
			></ButtonDate>
			<div className={styles.container__date}>
				{/* <List
					LeftSVG={DoctorSVG}
					RightSVG={DropDownSVG}
					defaultValue={selectedDateDoctor || 'Seleccione un Médico'}
					endPoint={endPointDateDoctor}
					isSelectedOption={isSelectedOption}
					// data={data}
				></List> */}

				{/* LISTADO DE CITAS MEDICAS DEL DOCTOR */}
				<ScheduleDoctor
					updateData={updateData}
					horarioCitasDisponibles={horarioCitasDisponibles}
					idSelectedSchedule={idSelectedSchedule}
					idSelectedDate={idSelectedDate}
					required={true}
					buttonClassActive={buttonClassActive}
					nameDoctor={nameDoctor}
					specialtyDoctor={specialtyDoctor}
				></ScheduleDoctor>
			</div>
		</div>
	);
};

export default React.memo(StepDateDoctor);
