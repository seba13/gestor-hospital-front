import useDragDoctor from '../../hooks/use-drag-doctor';
import styles from './doctor-specialty.module.css';
import React from 'react';

const DoctorSpecialty = ({ updateData, medicosEspecialidad, selectDoctor, selectedDoctor }) => {
	const { onPointerDownHandler, onPointerMoveHandler, onPointerCancelHandler } = useDragDoctor();

	return (
		<div
			className={styles['doctor-container']}
			onPointerDown={onPointerDownHandler}
			onPointerMove={onPointerMoveHandler}
			onPointerCancel={onPointerCancelHandler}
			// onChange={e => {
			// 	console.log('entra aca');
			// 	// cambiar por id de docor
			// 	setEndPointFechasDoctor('endpoint');

			// 	// updateData({ selectDoctor: e.target.value });
			// }}
		>
			{/* ARRAY DOCTORES POR ESPECIALIDAD */}
			{medicosEspecialidad?.map((doctor, index) => {
				return (
					<div key={doctor.id} className={`${styles['wrapper-doctor__element']}`}>
						<input
							type='radio'
							name='doctor'
							id={doctor.id}
							className={`${styles['input-radio']} ${styles.input__hidden}`}
							value={doctor.id}
							required
							onChange={e => {
								// cambiar por id de docor
								updateData({ endPointDateDoctor: `http://localhost:80/medicos/${doctor.id}/fechas` });

								console.log(`http://localhost:80/medicos/${doctor.id}/fechas`);

								// updateData({ endPointDateDoctor: 'endpoint' });
								updateData({ selectedDoctor: doctor.id });

								selectDoctor(doctor.id);
							}}
							checked={doctor.id === selectedDoctor}
						/>

						<label
							htmlFor={doctor.id}
							// id={doctor.id}
							className={`${styles['doctor-element']}`}
						>
							{doctor.img && <img src={doctor.img}></img>}

							<div className={`${styles.text__container}`}>
								<h3 className={`${styles.title}`}>{`Dr. ${doctor.nombre} ${doctor.apellido}`}</h3>
								<p className={`${styles.specialty}`}>{doctor.especialidad}</p>
							</div>
						</label>
					</div>
				);
			})}
		</div>
	);
};

export default React.memo(DoctorSpecialty);
