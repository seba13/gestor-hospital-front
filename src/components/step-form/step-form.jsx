import styles from './step-form.module.css';
import DateSchedule from '../date-schedule/date-schedule';
import useSaveSchedule from '../../hooks/use-save-schedule';
import CloseSVG from '../svg/close-svg';
import UseStepForm from '../../hooks/use-step-form';
import { useState } from 'react';
import FormScheduleUser from '../form-schedule-user/form-schedule-user';

const StepForm = ({ hideSchedule, endPointMedicosEspecialidad }) => {
	const initialData = {
		selectedDoctor: '',
		selectedDateDoctor: '',
		selectedSchedule: '',
		endPointDateDoctor: '',
		endPointScheduleDoctor: '',
	};
	const [data, setData] = useState(initialData);

	const updateData = input => {
		setData(currData => {
			return { ...currData, ...input };
		});
	};

	// const { handleSaveschedule, cancelSchedule } = useSaveSchedule(hideSchedule);
	const { handleCancelSchedule } = useSaveSchedule(hideSchedule);

	// const steps = [<DateSchedule key={0} />, <h1 key={1}>Step 2</h1>];

	const { step, back, next, isFirstStep, isLastStep } = UseStepForm([
		<DateSchedule key={0} {...data} updateData={updateData} endPointMedicosEspecialidad={endPointMedicosEspecialidad} />,
		<FormScheduleUser key={1} {...data} updateData={updateData}></FormScheduleUser>,
	]);

	// useEffect(() => {
	// 	document.querySelector(`.${styles['wrapper-date-schedule']}`).classList.add(`${styles['fade-in-bg']}`);
	// 	document.querySelector(`.${styles['date-schedule-container']}`).classList.add(`${styles['fade-in']}`);

	// 	return () => {
	// 		document.querySelector(`.${styles['wrapper-date-schedule']}`).classList.remove(`${styles['fade-in-bg']}`);
	// 		document.querySelector(`.${styles['date-schedule-container']}`).classList.remove(`${styles['fade-in']}`);
	// 	};
	// });

	return (
		<div className={`${styles['wrapper-date-schedule']} `}>
			<div className={`${styles['date-schedule-container']} `}>
				<span className={styles.span__close} onClick={handleCancelSchedule}>
					{<CloseSVG width={24} height={24} />}
				</span>
				{/* <DateSchedule></DateSchedule> */}
				{step}
				<div className={`${styles.form_group}  ${styles.form_group__button}`}>
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
						<button
							type='submit'
							className={`${styles['button-submit']}`}
							onClick={e => {
								// e.preventDefault();
								next();
							}}
						>
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
