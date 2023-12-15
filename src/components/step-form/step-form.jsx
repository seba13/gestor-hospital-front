import styles from './step-form.module.css';
import StepDateDoctor from '../step-date-doctor/step-date-doctor';
import useSaveSchedule from '../../hooks/use-save-form-appointments';
import CloseSVG from '../svg/close-svg';
import UseStepForm from '../../hooks/use-step-form';
import { useEffect, useState } from 'react';
import StepDataPatient from '../step-data-patient/step-data-patient';

const StepForm = ({ hideSchedule, endPointMedicosEspecialidad, inputValidation }) => {
	const initialData = {
		nameDoctor: undefined,
		specialtyDoctor: undefined,
		idSelectedDoctor: undefined, // id medico seleccionado
		selectedDoctor: undefined, // medico seleccionado
		idSelectedSchedule: undefined, // id cita seleccionada
		selectedSchedule: undefined, // hora seleccionada
		idSelectedDate: undefined, // idFecha seleccionada
		selectedDate: undefined, // fecha seleccionada
		selectedYear: undefined, // anio seleccionado
		selectedMonth: undefined, // mes seleccionado
		selectedDay: undefined, // dia seleccionado
		dayOfWeek: undefined, // dia semana seleccionado
		duracionCita: undefined,
		buttonClass: 'disabled',
		// endPointDateDoctor: '',
		// endPointScheduleDoctor: '',
	};

	const [data, setData] = useState(initialData);

	const updateData = input => {
		setData(currData => {
			return { ...currData, ...input };
		});

		if (input.selectedDate) {
			setData(currData => {
				return { ...currData, selectedSchedule: undefined, idSelectedSchedule: undefined };
			});
		}
	};

	useEffect(() => {
		console.log('USE EFFECT STEP FORM');
		console.log({ data });
	}, [data]);

	const { handleCancelSchedule } = useSaveSchedule(hideSchedule);

	const { step, back, next, isFirstStep, isLastStep } = UseStepForm([
		<StepDateDoctor
			key={0}
			{...data}
			updateData={updateData}
			endPointMedicosEspecialidad={endPointMedicosEspecialidad}
		/>,
		<StepDataPatient key={1} {...data} updateData={updateData}></StepDataPatient>,
	]);

	const nextPage = e => {
		e.preventDefault();

		const inputs = [
			{
				type: 'checkbox',
				id: data.idSelectedDoctor,
				value: data.selectedDoctor,
				name: 'select-doctor',
				errorMessage: 'Médico: Para continuar seleccione un médico',
			},
			{
				type: 'checkbox',
				id: data.idSelectedDate,
				value: data.selectedDate,
				name: 'select-date',
				errorMessage: 'Calendario médico: Para continuar seleccione una fecha del calendario médico',
			},
			{
				type: 'checkbox',
				id: data.idSelectedSchedule,
				value: data.selectedSchedule,
				name: 'select-appointment',
				errorMessage: 'Horario médico: Para continuar seleccione una hora de cita',
			},
		];

		if (inputValidation(inputs)) {
			next();
		}
	};

	// const inputValidation = () => {
	// 	const inputs = [
	// 		{
	// 			type: 'checkbox',
	// 			id: data.idSelectedDoctor,
	// 			value: data.selectedDoctor,
	// 			name: 'select-doctor',
	// 		},
	// 		{
	// 			type: 'checkbox',
	// 			id: data.idSelectedDate,
	// 			value: data.selectedDate,
	// 			name: 'select-date',
	// 		},
	// 		{
	// 			type: 'checkbox',
	// 			id: data.idSelectedSchedule,
	// 			value: data.selectedSchedule,
	// 			name: 'select-appointment',
	// 		},
	// 	];

	// 	return validationForm(inputs);
	// };

	return (
		<div className={`${styles['wrapper-date-schedule']} `}>
			<div className={`${styles['date-schedule-container']} `}>
				<span className={`${styles['span-svg']} ${styles.span__close}`} onClick={handleCancelSchedule}>
					{<CloseSVG width={24} height={24} />}
				</span>
				{step}
				<div className={`${styles.form__group}  ${styles.form__group__button}`}>
					{!isFirstStep && (
						<button
							className={`${styles['button-submit']}`}
							onClick={e => {
								e.preventDefault();
								back();
							}}
						>
							Anterior
						</button>
					)}
					{!isLastStep && (
						<button type='submit' className={`${styles['button-submit']}`} onClick={nextPage}>
							CONTINUAR
						</button>
					)}
					{isLastStep && (
						<button
							type='button'
							className={`${styles['button-submit']}`}
							onClick={e => {
								next();
							}}
						>
							AGENDAR
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default StepForm;
