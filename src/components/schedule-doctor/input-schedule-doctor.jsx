import React, { useState } from 'react';
import styles from './input-schedule-doctor.module.css';
import ButtonDate from '../button-date/button-date';
import DropDownSVG from '../svg/drop-down-svg';
import ClockSVG from '../svg/clock-svg';
const InputScheduleDoctor = ({ updateData, horarioCitasDisponibles, idSelectedSchedule, idSelectedDate }) => {
	const [open, setOPen] = useState(false);

	const handleClickButton = () => {
		setOPen(!open);
	};

	return (
		<div className={`${styles.schedule__hour__container} `}>
			<ButtonDate
				onHandleClickButton={idSelectedDate && handleClickButton}
				styleProps={{
					position: 'sticky',
					top: '0px',
					right: '0px',
					zIndex: '260',
					backgroundColor: '#003049',
				}}
				LeftIconSVG={ClockSVG}
				RightIconSVG={DropDownSVG}
				title={'HORARIO MÉDICO'}
			></ButtonDate>
			<div className={`${styles.wrapper__appointments} ${(open || '') && styles.open}`}>
				{/* ARRAY CITAS DE DOCTOR (DISPONIBLES Y AGENDADAS) */}
				{horarioCitasDisponibles &&
					horarioCitasDisponibles.citas &&
					horarioCitasDisponibles.citas.map((horarioCita, index) => {
						return (
							<div key={index}>
								<input
									type='radio'
									name='hour'
									className={`${styles['input-radio']} ${styles.input__hidden}`}
									id={horarioCita.id}
									disabled={!horarioCita.disponibilidad}
									onChange={() => {
										updateData({ idSelectedSchedule: horarioCita.id });
										updateData({ duracionCita: horarioCita.duracionCita });
										updateData({ selectedSchedule: `${horarioCita.horaInicioString}` });
									}}
									checked={idSelectedSchedule === horarioCita.id}
								/>
								<label htmlFor={horarioCita.id} className={styles.schedule__hour__element}>
									<span className={styles.schedule__hour__text}>
										<span className={styles.text__title}>Dr M. Smith</span>
										<span className={styles.text__specialty}>cardiologist</span>
									</span>
									<span className={styles.schedule__hour__availability}>
										<span className={styles.text__bold}>
											{`${horarioCita.horaInicioString} - ${horarioCita.horaFinString}`}
										</span>
										<span
											className={`${styles.status} ${
												horarioCita.disponibilidad ? styles.available : styles.unavailable
											}`}
										>
											{horarioCita.disponibilidad ? 'Disponible' : 'Tomada'}
										</span>
									</span>
								</label>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default React.memo(InputScheduleDoctor);
