import styles from './step-form.module.css';
import StepDateDoctor from '../step-date-doctor/step-date-doctor';
import useCloseForm from '../../hooks/use-save-form-appointments';
import CloseSVG from '../svg/close-svg';
import UseStepForm from '../../hooks/use-step-form';
import { useEffect } from 'react';
import StepDataPatient from '../step-data-patient/step-data-patient';
import useForms from '../../hooks/use-forms';
import { useInputRut } from '../../hooks/use-input-rut';
import Loader from '../loader/loader.jsx';
import Alert from '../alert/alert.jsx';
import useAlert from '../../hooks/use-alert.js';

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

		inputNamePatient: '',
		inputMotherLastName: '',
		inputFatherLastNamePatient: '',
		inputEmailPatient: '',
		inputRutPatient: '',
		inputTelephonePatient: '',
		// endPointDateDoctor: '',
		// endPointScheduleDoctor: '',
	};

	const initialErrors = {
		'name-patient': null,
		'father-last-name': null,
		'mother-last-name': null,
		'email-patient': null,
		'rut-patient': null,
		'telephone-patient': null,
	};

	const { rut, handleKeyDownInputRut, handleChangeInputRut, validateRut } = useInputRut();

	const validateForm = {
		'name-patient': value => {
			return value.trim().length > 0 ? null : { 'name-patient': 'Requerido' };
		},
		'father-last-name': value => {
			return value.trim().length > 0 ? null : { 'father-last-name': 'Requerido' };
		},
		'mother-last-name': value => {
			return value.trim().length > 0 ? null : { 'mother-last-name': 'Requerido' };
		},
		'telephone-patient': value => ({
			'telephone-patient':
				(value.trim() < 1 && 'Requerido') ||
				(isNaN(parseInt(value.trim())) && 'Número inválido') ||
				(value.trim().length < 9 && 'Número inválido') ||
				null,
		}),
		'email-patient': value => ({
			'email-patient':
				(value.trim() < 1 && 'Requerido') ||
				(!/^(([^<>()[\]\\.,;:\s@”]+(\.[^<>()[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/.test(
					value
				) &&
					'Email inválido') ||
				null, // validar email
		}),
		'rut-patient': value => ({ 'rut-patient': validateRut(value) }),
	};

	const { form, updateData, handleChange, handleBlur, handleFocus, errors, handleSubmit, loading, responseFetch } =
		useForms({
			initialData,
			initialErrors,
			validateForm,
		});

	const { abierto, cerrarAlert, abrirAlert } = useAlert();

	useEffect(() => {
		console.log('USE EFFECT STEP FORM');
		console.log({ form });
	}, [form]);

	useEffect(() => {
		if (!loading && responseFetch) {
			abrirAlert(alert);
		}
	}, [loading]);

	const { handleCancelSchedule } = useCloseForm(hideSchedule);

	const { step, back, next, isFirstStep, isLastStep, currentStepIndex } = UseStepForm([
		<StepDateDoctor
			key={0}
			{...form}
			updateData={updateData}
			endPointMedicosEspecialidad={endPointMedicosEspecialidad}
		/>,
		<StepDataPatient
			key={1}
			{...form}
			updateData={updateData}
			handleChangeInput={handleChange}
			handleBlurInput={handleBlur}
			handleFocusInput={handleFocus}
			rut={rut}
			handleChangeInputRut={handleChangeInputRut}
			handleKeyDownInputRut={handleKeyDownInputRut}
			validateRut={validateRut}
			errors={errors}
		></StepDataPatient>,
	]);

	const nextPage = e => {
		e.preventDefault();

		if (currentStepIndex === 0) {
			const inputs = [
				{
					type: 'checkbox',
					id: form.idSelectedDoctor,
					value: form.selectedDoctor,
					name: 'select-doctor',
					errorMessage: 'Médico: Para continuar seleccione un médico',
				},
				{
					type: 'checkbox',
					id: form.idSelectedDate,
					value: form.selectedDate,
					name: 'select-date',
					errorMessage: 'Calendario médico: Para continuar seleccione una fecha del calendario médico',
				},
				{
					type: 'checkbox',
					id: form.idSelectedSchedule,
					value: form.selectedSchedule,
					name: 'select-appointment',
					errorMessage: 'Horario médico: Para continuar seleccione una hora de cita',
				},
			];

			if (inputValidation(inputs)) {
				next();
			}
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

								updateData({ idSelectedSchedule: undefined });
								updateData({ selectedSchedule: undefined });

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
								handleSubmit(e);
							}}
						>
							AGENDAR
						</button>
					)}
				</div>
			</div>

			{loading && <Loader></Loader>}
			{abierto && responseFetch && (
				<Alert title={'Agendar cita'} cerrarAlert={cerrarAlert} responseFetch={responseFetch}></Alert>
			)}
		</div>
	);
};

export default StepForm;
