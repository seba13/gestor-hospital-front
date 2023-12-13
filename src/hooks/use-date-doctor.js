import { useEffect, useMemo, useState } from 'react';
import transformSchedule from '../helpers/transform-schedule';
import { fetchData, fechDataAppointments } from '../helpers/fetch-data';

const useDateDoctor = ({
	endPointMedicosEspecialidad,
	endPointScheduleDoctor,
	idSelectedDoctor,
	selectedDate,
	dayOfWeek,
}) => {
	

	const [horarioCitasDisponibles, setHorarioCitasDisponibles] = useState([]);
	const [listEspecialtyDoctor, setListEspecialtyDoctor] = useState([]);
	const [diasLaboralesMedico, setDiasLaboralesMedico] = useState([]);

	// states para obtener horario citas
	// para fecha citas se debe considerar que el inputDate guardado los meses van de 0 a 11
	const [idMedico, setIdMedico] = useState(idSelectedDoctor || undefined);
	const [fechaCitas, setFechaCitas] = useState(selectedDate || undefined);
	const [idDia, setIdDia] = useState(dayOfWeek || undefined);

	// ENDPOINT QUE CARGA LAS FECHAS A PARTIR DE UN MEDICO
	// const [endPointDate, setEndPointDate] = useState(null);

	// endPoint que carga las horas de citas a partir de una fecha
	const [endPointAppointments] = useState(
		`${import.meta.env.VITE_DOMINIO}:${import.meta.env.VITE_APP_PORT}/medicos/horario`
	);

	const changeEndPointAppointments = ({ idSelectedDoctor: newIdMedico, fechaCitas: newFecha, idDia: newIdDia }) => {
		console.log('***************');
		console.log({ newFecha });

		setIdMedico(newIdMedico);
		setFechaCitas(newFecha);
		setIdDia(newIdDia);
	};

	const changeIdDoctor = idMedico => {
		setIdMedico(idMedico);
		// console.log('acacaac');

		// const url = `${import.meta.env.VITE_DOMINIO}:${import.meta.env.VITE_APP_PORT}/medicos/${idMedico}/dias-citas/`;

		// setEndPointDate(url);
	};

	const fetchCitas = useMemo(
		() => () => {
			console.log({ fechaCitas });
			console.log({ idMedico });
			console.log({ idDia });

			if (fechaCitas && idMedico && idDia) {
				fechDataAppointments({ endPointAppointments, idMedico, fechaCitas, idDia }).then(response => {
					setHorarioCitasDisponibles(transformSchedule(response.data));
				});
			} else {
				setHorarioCitasDisponibles([]);
			}
		},
		[fechaCitas]
	);

	useEffect(() => {
		fetchCitas();
	}, [fechaCitas]);

	// CARGA TODOS LOS MEDICOS DE UNA ESPECIALIDAD DETERMINADA
	const fetchSpecialtiesDoctor = useMemo(
		() => () => {
			// especialidad
			if (endPointMedicosEspecialidad && endPointMedicosEspecialidad !== '') {
				fetchData(endPointMedicosEspecialidad).then(res => {
					setListEspecialtyDoctor(res.data);
				});
			}
		},
		[endPointMedicosEspecialidad]
	);

	useEffect(() => {
		fetchSpecialtiesDoctor();
	}, [endPointMedicosEspecialidad]);

	const fetchDates = useMemo(
		() => () => {
			if (idMedico && idMedico !== '') {
				fetchData(
					`${import.meta.env.VITE_DOMINIO}:${import.meta.env.VITE_APP_PORT}/medicos/${idMedico}/dias-citas/`
				).then(res => {
					setDiasLaboralesMedico(res.data);
				});
			}
		},
		[idMedico]
	);

	useEffect(() => {
		fetchDates();
	}, [idMedico]);

	return {
		horarioCitasDisponibles,
		listEspecialtyDoctor,
		changeEndPointAppointments,
		changeIdDoctor,
		diasLaboralesMedico,
		fetchDates,
	};
};
export default useDateDoctor;
