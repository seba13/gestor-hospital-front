const transformSchedule = async horasCitaDoctor => {
	/**
	 *  @type {Array.<{citas: Array.<{hora_inicio: Date, hora_fin: Date}>, disponibilidad: bool, horaInicioString: string, horaFinString: string, id: string, duracionCita: number}>}
	 * 	@description Almacena todas las citas ya sean disponibles o agendadas
	 *  si una cita está disponible disponibilidad será true
	 * 	si está agendada disponibilidad será false
	 */
	const arrCitas = [];

	console.log('TRANSFORMSCHEDULE');

	console.log({ horasCitaDoctor });

	// data = {
	// 		horas_doctor: [
	// 			{
	// 				hora_inicio: '14:30',
	// 				hora_fin: '16:00',
	// 			},

	// 			{
	// 				hora_inicio: '10:30',
	// 				hora_fin: '13:00',
	// 			},
	// 			{
	// 				hora_inicio: '09:30',
	// 				hora_fin: '10:00',
	// 			},
	// 		],
	// 		duracion_descanso: 5,
	// 		duracion_cita: 40,
	// 		citas: [
	// 			{
	// 				id_cita: 1,
	// 				hora_inicio_cita: '09:30',
	// 				hora_fin_cita: '09:55',
	// 			},
	// 			{
	// 				id_cita: 2,
	// 				hora_inicio_cita: '11:30',
	// 				hora_fin_cita: '12:00',
	// 			},
	// 			{
	// 				id_cita: 3,
	// 				hora_inicio_cita: '12:30',
	// 				hora_fin_cita: '13:00',
	// 			},
	// 		]

	/**
	 * @type {{duracion_cita: {horas: number, minutos: number}, duracion_descanso: {horas : number, minutos: number}}} duracion_cita
	 * @description separa las hora de los minutos de la duracion descanso y duracion cita
	 */
	const tramosCitas = {
		duracion_cita: {
			horas: parseInt(horasCitaDoctor.duracion_cita / 60),
			minutos: horasCitaDoctor.duracion_cita % 60,
		},
		duracion_descanso: {
			horas: parseInt(horasCitaDoctor.duracion_descanso / 60),
			minutos: horasCitaDoctor.duracion_descanso % 60,
		},
	};

	/**
	 * Recibe una hora string y devuelve un date con las horas y minutos
	 * @param {string} stringHora
	 * @returns {Date}
	 */
	const getDate = stringHora => {
		try {
			const dateHora = new Date();
			dateHora.setHours(stringHora.split(':')[0]);
			dateHora.setMinutes(stringHora.split(':')[1]);
			dateHora.setSeconds(0);
			return dateHora;
		} catch (e) {
			console.error('ERROR AL TRANSFORMAR STRING A DATE');
		}
	};

	/**
	 * Recorre el array de citas del medico
	 * para crear un array de objetos con la hora de inicio y de fin de cada cita
	 *
	 * @type {Array.<{dateCita: {hora_inicio: Date, hora_fin: Date}>}}
	 */
	const citasAgendadas = horasCitaDoctor.citas.map(cita => {
		const dateCita = {
			hora_inicio: getDate(cita.hora_inicio_cita),
			hora_fin: getDate(cita.hora_fin_cita),
		};

		console.log('citas agendadads');

		console.log({ dateCita });

		return dateCita;
	});

	/**
	 * Recibe como parametro dos objetos con un Date para la hora de inicio y la hora de fin
	 * en caso de ocurrir una colision devuelve true
	 * @param {{hora_inicio: Date, hora_fin: DATE}} posibleCita Objeto que contiene la posible hora_inicio y posible_hora_fin de una cita
	 * @param {Array.<{hora_inicio:DATE, hora_fin: DATE}>} citasAgendadas Array que contiene objetos con hora_inicio y hora_fin de las cita agendadas
	 * @param {Date} citasAgendadas[].hora_inicio
	 * @returns {bool}
	 */
	const colisionCita = (posibleCita, citasAgendadas) => {
		console.log('validar colision');
		return citasAgendadas.some(citaAgendada => {
			if (posibleCita.hora_inicio < citaAgendada.hora_inicio && posibleCita.hora_fin >= citaAgendada.hora_fin)
				return true;

			if (
				posibleCita.hora_inicio < citaAgendada.hora_inicio &&
				posibleCita.hora_fin >= citaAgendada.hora_inicio &&
				posibleCita.hora_fin <= citaAgendada.hora_fin
			)
				return true;

			if (
				posibleCita.hora_inicio >= citaAgendada.hora_inicio &&
				posibleCita.hora_inicio <= citaAgendada.hora_fin &&
				posibleCita.hora_fin >= citaAgendada.hora_fin
			)
				return true;

			if (
				posibleCita.hora_inicio >= citaAgendada.hora_inicio &&
				posibleCita.hora_fin >= citaAgendada.hora_inicio &&
				posibleCita.hora_fin <= citaAgendada.hora_fin
			)
				return true;

			return false;

			// return (
			// 	(posibleCita.hora_inicio <= citaAgendada.hora_inicio && posibleCita.hora_fin >= citaAgendada.hora_fin) ||
			// 	(posibleCita.hora_inicio <= citaAgendada.hora_inicio &&
			// 		posibleCita.hora_fin >= citaAgendada.hora_inicio &&
			// 		posibleCita.hora_fin <= citaAgendada.hora_fin) ||
			// 	(posibleCita.hora_inicio > citaAgendada.hora_inicio && posibleCita.horaFin >= citaAgendada.hora_fin) ||
			// 	(posibleCita.hora_inicio > citaAgendada.hora_inicio &&
			// 		posibleCita.hora_fin > citaAgendada.hora_inicio &&
			// 		posibleCita.hora_fin < citaAgendada.hora_fin)

			// (posibleCita.hora_inicio.getTime() >= citaAgendada.hora_inicio.getTime() &&
			// 	posibleCita.hora_fin.getTime() <= citaAgendada.hora_fin.getTime()) ||
			// (posibleCita.hora_fin.getTime() >= citaAgendada.hora_inicio.getTime() &&
			// 	posibleCita.hora_fin.getTime() <= citaAgendada.hora_fin.getTime()) ||
			// (posibleCita.hora_inicio.getTime() <= citaAgendada.hora_inicio.getTime() &&
			// 	posibleCita.hora_fin.getTime() >= citaAgendada.hora_fin.getTime())
			// );
		});
	};

	/**
	 *
	 * @type {Array.<{date_hora_inicio:Date, date_hora_fin : Date}>}
	 * Recorre los bloques horarios del array horas_doctor del medico
	 * que contiene objetos string con las horas de inicio y fin
	 *
	 * Devuelve un array de objetos con tipos de dato DATE para la hora_inicio y hora_fin
	 * considerando las horas y minutos para cada uno
	 */
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

	/**
	 *
	 * devuelve la hora como string en formato HH:mm
	 * a partir de una tipo de dato Date
	 * 	@param {Date} fecha
	 */
	const formatHoraString = fecha => {
		/**
		 *  @type {{hour: '2-digit', minute: '2-digit'}} stringFecha
		 */
		const opciones = { hour: '2-digit', minute: '2-digit' };

		/**
		 * devuelve un string con la hora en formato HH:mm
		 * toLocaleTimeString devuelve el formato segun la configuracion regional
		 * si se ingresa undefined en el primer paramaetro se establece por defecto
		 * por ejemplo 'es-ES'
		 * @type {string} hora
		 */
		const hora = fecha.toLocaleTimeString(undefined, opciones);

		return hora;
	};

	/**
	 * crea posible horario de cita en base a la duracion promedio de la cita y el descanso de post citas
	 * si no hay colision se agrega al arrCitas con disponibilidad true
	 * retorna un array con las citas disponibles
	 */
	horarioAtencion.forEach(intervaloAtencion => {
		const posibleHoraCita = intervaloAtencion.date_hora_inicio;

		while (posibleHoraCita <= intervaloAtencion.date_hora_fin) {
			console.log({ intervaloAtencion: intervaloAtencion.date_hora_fin });
			console.log({ posibleHoraCita });
			const duracionPosibleCita = new Date(posibleHoraCita);

			duracionPosibleCita.setHours(
				duracionPosibleCita.getHours() + (tramosCitas.duracion_cita.horas + tramosCitas.duracion_descanso.horas)
			);
			duracionPosibleCita.setMinutes(
				duracionPosibleCita.getMinutes() + (tramosCitas.duracion_cita.minutos + tramosCitas.duracion_descanso.minutos)
			);
			duracionPosibleCita.setSeconds(0);

			console.log({ duracionPosibleCita });

			console.log({ intervaloFinAtencion: intervaloAtencion.date_hora_fin });

			if (duracionPosibleCita > intervaloAtencion.date_hora_fin) break;

			if (!colisionCita({ hora_inicio: posibleHoraCita, hora_fin: duracionPosibleCita }, citasAgendadas)) {
				const inicioCitaDisponible = new Date(posibleHoraCita);
				const finCitaDisponible = new Date(posibleHoraCita);
				finCitaDisponible.setHours(finCitaDisponible.getHours() + tramosCitas.duracion_cita.horas);
				finCitaDisponible.setMinutes(finCitaDisponible.getMinutes() + tramosCitas.duracion_cita.minutos);

				arrCitas.push({
					cita: {
						hora_inicio: inicioCitaDisponible,
						hora_fin: finCitaDisponible,
					},
					disponibilidad: true,
					id: `${horasCitaDoctor.fecha} ${formatHoraString(inicioCitaDisponible)}`,
					horaInicioString: formatHoraString(inicioCitaDisponible),
					horaFinString: formatHoraString(finCitaDisponible),
					duracionCita: horasCitaDoctor.duracion_cita,
				});
			}

			posibleHoraCita.setHours(
				posibleHoraCita.getHours() + tramosCitas.duracion_cita.horas + tramosCitas.duracion_descanso.horas
			);
			posibleHoraCita.setMinutes(
				posibleHoraCita.getMinutes() + tramosCitas.duracion_cita.minutos + tramosCitas.duracion_descanso.minutos
			);
			posibleHoraCita.setSeconds(0);
		}
	});

	// Recorre las citas agendadas y las agrega al arrCitas
	// con disponibilidad en falso
	citasAgendadas.forEach(citaAgendada => {
		arrCitas.push({
			cita: {
				hora_inicio: citaAgendada.hora_inicio,
				hora_fin: citaAgendada.hora_fin,
			},
			id: `${horasCitaDoctor.fecha} ${formatHoraString(citaAgendada.hora_inicio)}`,
			disponibilidad: false,
			horaInicioString: formatHoraString(citaAgendada.hora_inicio),
			horaFinString: formatHoraString(citaAgendada.hora_fin),
		});
	});

	citasAgendadas.sort((a, b) => {
		return a.hora_inicio - b.hora_inicio;
	});

	/**
	 * Ordena las citas de forma ascendente segun el horario de inicio de la cit
	 */
	arrCitas.sort((a, b) => a.cita.hora_inicio - b.cita.hora_fin);

	console.log({ arrCitas });

	return { citas: arrCitas };
};

export default transformSchedule;
