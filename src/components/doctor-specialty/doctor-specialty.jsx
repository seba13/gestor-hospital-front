import useDragDoctor from '../../hooks/use-drag-doctor';
import styles from './doctor-specialty.module.css';
import React from 'react';

const DoctorSpecialty = ({
	updateData,
	medicosEspecialidad,
	selectDoctor,
	idSelectedDoctor,
	nameDoctor,
	loadingImagesDoctor,
	imageLoadedDoctor,
}) => {
	const { onPointerDownHandler, onPointerMoveHandler, onPointerCancelHandler } = useDragDoctor();

	return (
		<div
			className={styles['doctor-container']}
			onPointerDown={onPointerDownHandler}
			onPointerMove={onPointerMoveHandler}
			onPointerCancel={onPointerCancelHandler}
		>
			<h2 className={styles.container__title}>Seleccione un médico</h2>
			{/* ARRAY DOCTORES POR ESPECIALIDAD */}
			{medicosEspecialidad?.map((doctor, index) => {
				return (
					<div key={doctor.idMedico} className={`${styles['wrapper-doctor__element']}`}>
						<input
							type='radio'
							name='doctor'
							id={doctor.idMedico}
							className={`${styles['input-radio']} ${styles.input__hidden}`}
							value={doctor.idMedico}
							required
							onChange={e => {
								// cambiar por id de docor
								// updateData({ endPointDateDoctor: `http://localhost:80/medicos/${doctor.idMedico}/fechas` });

								// almacena id medico en form step
								updateData({ idSelectedDoctor: doctor.idMedico });
								updateData({ selectedDoctor: doctor.idMedico });
								updateData({ nameDoctor: `${doctor.nombre} ${doctor.paterno}` });
								updateData({ specialtyDoctor: `${doctor.especialidad}` });
								// actualiza el endpoint
								selectDoctor(doctor.idMedico);
							}}
							checked={doctor.idMedico === idSelectedDoctor}
						/>

						<label
							htmlFor={doctor.idMedico}
							// id={doctor.id}
							className={`${styles['doctor-element']}`}
						>
							{doctor.imagenUrl && (
								<div className={`${styles['wrapper-img']}`}>
									<img
										src={`${import.meta.env.VITE_URL_API}${doctor.imagenUrl}`}
										onLoad={() => {
											imageLoadedDoctor({ idMedico: doctor.idMedico });

											return true;
										}}
										onError={e => {
											e.target.src = '/assets/img/doctor-animado.png';
											imageLoadedDoctor({ idMedico: doctor.idMedico });

											e.target.onerror = null;
											return true;
										}}
									></img>
									{loadingImagesDoctor[doctor.idMedico].loadingImage && <span className={styles.loader}></span>}
								</div>
							)}

							<div className={`${styles.text__container}`}>
								<h3 className={`${styles.title}`}>{`Dr. ${doctor.nombre} ${doctor.paterno} ${doctor.materno}`}</h3>
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
