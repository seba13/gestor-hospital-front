const transformSchedule = horasCitaDoctor => {
	const arrCitas = [];

	const tramosCitas = {
		duracion_cita: {
			horas: parseInt(horasCitaDoctor.duracion_cita / 60),
			minutos: horasCitaDoctor.duracion_cita % 60,
		},
		duracion_descanso: {
			horas: parseInt(horasCitaDoctor.duracion_descanso / 60),
			minutos: horasCitaDoctor.duracion_descanso % 60,
		},
		// horas: parseInt((horasCitaDoctor.duracion_cita + horasCitaDoctor.duracion_descanso) / 60),
		// minutos: (horasCitaDoctor.duracion_cita + horasCitaDoctor.duracion_descanso) % 60,
	};

	const getDate = stringHora => {
		const dateHora = new Date();
		dateHora.setHours(stringHora.split(':')[0]);
		dateHora.setMinutes(stringHora.split(':')[1]);
		dateHora.setSeconds(0);

		return dateHora;
	};

	// CITAS AGENDADAS
	const citasAgendadas = horasCitaDoctor.citas.map(cita => {
		const dateCita = {
			hora_inicio: getDate(cita.hora_inicio_cita, cita.hora_fin_cita),
			hora_fin: getDate(cita.hora_fin_cita),
		};

		return dateCita;
	});

	const colisionCita = (posibleCita, citasAgendadas) => {
		return citasAgendadas.some(citaAgendada => {
			return (
				(posibleCita.hora_inicio >= citaAgendada.hora_inicio && posibleCita.hora_fin <= citaAgendada.hora_fin) ||
				(posibleCita.hora_fin >= citaAgendada.hora_inicio && posibleCita.hora_fin <= citaAgendada.hora_fin) ||
				(posibleCita.hora_inicio <= citaAgendada.hora_inicio && posibleCita.hora_fin >= citaAgendada.hora_fin)
			);

			// return false;
		});
	};

	console.log({ citasAgendadas });

	// CONVIERTE LAS HORAS DISPONIBLES DEL DR EN TIPOS DE DATO DATE Y ORDENA LOS INTERVALOS DE FORMA ASCENDENTE
	const horarioAtencion = horasCitaDoctor.horas_doctor
		.reduce((prev, curr) => {
			const horaInicio = {
				horas: curr.hora_inicio.split(':')[0],
				minutos: curr.hora_inicio.split(':')[1],
			};

			const horaFin = {
				horas: curr.hora_fin.split(':')[0],
				minutos: curr.hora_fin.split(':')[1],
			};

			const dateHoraInicio = new Date();
			dateHoraInicio.setHours(horaInicio.horas, horaInicio.minutos, 0);

			const dateHoraFin = new Date();
			dateHoraFin.setHours(horaFin.horas, horaFin.minutos, 0);

			prev.push({
				date_hora_inicio: dateHoraInicio,
				date_hora_fin: dateHoraFin,
			});

			return prev;
		}, [])
		.sort((a, b) => a.date_hora_inicio - b.date_hora_fin);

	horarioAtencion.forEach(intervaloAtencion => {
		const posibleHoraCita = intervaloAtencion.date_hora_inicio;

		while (posibleHoraCita <= intervaloAtencion.date_hora_fin) {
			const duracionPosibleCita = new Date(posibleHoraCita);

			duracionPosibleCita.setHours(
				duracionPosibleCita.getHours() + (tramosCitas.duracion_cita.horas + tramosCitas.duracion_descanso.horas)
			);
			duracionPosibleCita.setMinutes(
				duracionPosibleCita.getMinutes() + (tramosCitas.duracion_cita.minutos + tramosCitas.duracion_descanso.minutos)
			);
			duracionPosibleCita.setSeconds(0);

			if (
				duracionPosibleCita > intervaloAtencion.date_hora_fin ||
				colisionCita({ hora_inicio: posibleHoraCita, hora_fin: duracionPosibleCita }, citasAgendadas)
			)
				break;

			const inicioCitaDisponible = new Date(posibleHoraCita);
			const finCitaDisponible = new Date(posibleHoraCita);
			finCitaDisponible.setHours(finCitaDisponible.getHours() + tramosCitas.duracion_cita.horas);
			finCitaDisponible.setMinutes(finCitaDisponible.getMinutes() + tramosCitas.duracion_cita.minutos);

			console.log({ inicioCitaDisponible });
			console.log({ hora_dur_cita: tramosCitas.duracion_cita.horas });
			console.log({ min_dur_cita: tramosCitas.duracion_cita.minutos });

			arrCitas.push({
				cita: {
					hora_inicio: inicioCitaDisponible,
					hora_fin: finCitaDisponible,
				},
				disponibilidad: true,
			});

			posibleHoraCita.setHours(
				posibleHoraCita.getHours() + tramosCitas.duracion_cita.horas + tramosCitas.duracion_descanso.horas
			);
			posibleHoraCita.setMinutes(
				posibleHoraCita.getMinutes() + tramosCitas.duracion_cita.minutos + tramosCitas.duracion_descanso.minutos
			);
			posibleHoraCita.setSeconds(0);
		}
	});

	// agregar citas agendadas
	citasAgendadas.forEach(citaAgendada => {
		arrCitas.push({
			cita: {
				hora_inicio: citaAgendada.hora_inicio,
				hora_fin: citaAgendada.hora_fin,
			},
			disponibilidad: false,
		});
	});

	arrCitas.sort((a, b) => a.cita.hora_inicio - b.cita.hora_fin);

	console.log({ arrCitas });

	return arrCitas;

	// console.log('CITAS DISPONIBLES');
};

export default transformSchedule;
