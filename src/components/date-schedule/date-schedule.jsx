import styles from './date-schedule.module.css';
import List from '../list/list';
// import useDragDoctor from '../../hooks/use-drag-doctor';
import useDateDoctor from '../../hooks/use-date-doctor';
import React from 'react';

import DoctorSpecialty from '../doctor-specialty/doctor-specialty';
import ScheduleDoctor from '../schedule-doctor/schedule-doctor';
import useFetchList from '../../hooks/use-fetch-list';
// import useSaveSchedule from '../../hooks/use-save-schedule';

const DateSchedule = ({
	hideSchedule,
	endPointMedicosEspecialidad,
	selectedDoctor, // id
	endPointDateDoctor, // guarda enpoint en base a id id del doctor
	selectedDateDoctor, // guarda fecha selecciona doctor
	endPointScheduleDoctor, // guarda enpoint eb base a id de doctor y fecha
	selectedSchedule, // guarda hora seleccionada
	updateData,
}) => {
	// const { onPointerDownHandler, onPointerMoveHandler, onPointerCancelHandler } = useDragDoctor();

	// const [endPointFechasDoctor, setEndPointFechasDoctor] = useState('');

	const { data, changeEndPoint } = useFetchList('');
	const { cambiarEndPointCitas, medicosEspecialidad, horarioCitasDisponibles } = useDateDoctor({
		endPointMedicosEspecialidad,
		endPointScheduleDoctor,
	});

	const isSelectedOption = ({ value, id }) => {
		const endPointSchedule = `http://localhost:80/medicos/${selectedDoctor}/fechas/cita/${value}`;

		console.log({ endPointSchedule });

		updateData({ selectedDateDoctor: value });

		cambiarEndPointCitas(endPointSchedule);
		updateData({ endPointScheduleDoctor: endPointSchedule });
		// if (value === '12/01/23') {
		// 	cambiarEndPointCitas('');
		// } else cambiarEndPointCitas(null);
	};

	const selectDoctor = idDoctor => {
		const endPointDate = `http://localhost:80/medicos/${idDoctor}/fechas/`;
		changeEndPoint(endPointDate);
	};

	return (
		<div className={styles['form-step']}>
			<DoctorSpecialty
				medicosEspecialidad={medicosEspecialidad}
				updateData={updateData}
				selectDoctor={selectDoctor}
				selectedDoctor={selectedDoctor}
			></DoctorSpecialty>

			<div className={styles.container__date}>
				{/* LISTADO DE FECHAS QUE ATIENDE EL DR */}
				<List
					defaultValue={selectedDateDoctor || 'Seleccione un Médico'}
					endPoint={endPointDateDoctor}
					isSelectedOption={isSelectedOption}
					data={data}
				></List>

				{/* LISTADO DE CITAS MEDICAS DEL DOCTOR */}
				<ScheduleDoctor
					updateData={updateData}
					horarioCitasDisponibles={horarioCitasDisponibles}
					selectSchedule={selectedSchedule}
				></ScheduleDoctor>
			</div>
		</div>
	);
};

export default React.memo(DateSchedule);
