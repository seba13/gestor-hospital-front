import React from 'react';
import styles from './schedule-doctor.module.css';

const ScheduleDoctor = ({ updateData, horarioCitasDisponibles, selectSchedule }) => {

	return (
		<div className={styles.schedule__hour__container}>
			{/* ARRAY CITAS DE DOCTOR (DISPONIBLES Y AGENDADAS) */}
			{horarioCitasDisponibles.map((horarioCita, index) => {
				const id =
					horarioCita.cita.hora_inicio.getYear() +
					horarioCita.cita.hora_inicio.getMonth() +
					horarioCita.cita.hora_inicio.getDay() +
					horarioCita.cita.hora_inicio.getHours() +
					horarioCita.cita.hora_inicio.getMinutes();

				const horasInicio = horarioCita.cita.hora_inicio.getHours();
				let minutosInicio = horarioCita.cita.hora_inicio.getMinutes();

				const horasFin = horarioCita.cita.hora_fin.getHours();
				let minutosFin = horarioCita.cita.hora_fin.getMinutes();

				if (minutosInicio < 10) {
					minutosInicio = '0' + minutosInicio;
				}

				if (minutosFin < 10) {
					minutosFin = '0' + minutosFin;
				}

				console.log({ id });

				return (
					<div key={index}>
						<input
							type='radio'
							name='hour'
							className={`${styles['input-radio']} ${styles.input__hidden}`}
							id={id}
							disabled={!horarioCita.disponibilidad}
							onChange={() => {
								updateData({ selectSchedule: id });
							}}
							checked={selectSchedule === id}
						/>
						<label htmlFor={id} className={styles.schedule__hour__element}>
							<span className={styles.schedule__hour__text}>
								<span className={styles.text__title}>Dr M. Smith</span>
								<span className={styles.text__specialty}>cardiologist</span>
							</span>
							<span className={styles.schedule__hour__availability}>
								<span className={styles.text__bold}>
									{`${horasInicio}:${minutosInicio} - ${horasFin}:${minutosFin}`}
								</span>
								<span
									className={`${styles.status} ${horarioCita.disponibilidad ? styles.available : styles.unavailable}`}
								>
									{horarioCita.disponibilidad ? 'Disponible' : 'Tomada'}
								</span>
							</span>
						</label>
					</div>
				);
			})}
		</div>
	);
};

export default React.memo(ScheduleDoctor);
