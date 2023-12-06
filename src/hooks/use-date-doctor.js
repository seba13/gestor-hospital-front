import { useEffect, useMemo, useState } from 'react';
import transformSchedule from '../helpers/transform-schedule';
import fetchData from '../helpers/fetch-data';
const useDateDoctor = ({ endPointMedicosEspecialidad, endPointScheduleDoctor }) => {
	const [horarioCitasDisponibles, setHorarioCitasDisponibles] = useState([]);
	const [medicosEspecialidad, setMedicosEspecialidad] = useState([]);

	// ENDPOINT QUE CARGA LAS FECHAS A PARTIR DE UN MEDICO
	const [endPointFechas, setEndPointFechas] = useState(null);

	// endPoint que carga las horas de citas a partir de una fecha
	const [endPointCitas, setEndPointCitas] = useState(endPointScheduleDoctor);

	const cambiarEndPointCitas = url => {
		setEndPointCitas(url);
	};

	const cambiarEndPointFechas = url => {
		setEndPointFechas(url);
	};

	const fetchCitas = useMemo(
		() => () => {
			if (endPointCitas !== '') {
				fetchData(endPointCitas).then(res => {
					setHorarioCitasDisponibles(transformSchedule(res.data));
				});
			} else {
				setHorarioCitasDisponibles([]);
			}
		},
		[endPointCitas]
	);

	useEffect(() => {
		fetchCitas();
	}, [endPointCitas]);

	const fetchDates = useMemo(() => () => {}, [endPointFechas]);

	// CARGA TODOS LOS MEDICOS DE UNA ESPECIALIDAD DETERMINADA
	const fetchMedicosEspecialidad = useMemo(
		() => () => {
			console.log({ endPointMedicosEspecialidad });

			// especialidad
			fetchData(endPointMedicosEspecialidad).then(res => {
				setMedicosEspecialidad(res.data);
			});
		},
		[endPointMedicosEspecialidad]
	);

	useEffect(() => {
		fetchMedicosEspecialidad();
	}, [endPointMedicosEspecialidad]);

	return {
		horarioCitasDisponibles,
		medicosEspecialidad,
		cambiarEndPointCitas,
		cambiarEndPointFechas,
		fetchDates,
	};
};
export default useDateDoctor;
