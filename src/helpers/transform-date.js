/**
 *
 * @param {object} dataCalendario
 * @param {object} dataCalendario.diasLaboralesMedico
 * @param {number} dataCalendario.mes
 * @param {number} dataCalendario.anio
 * @returns
 */
const transformDate = async({ diasLaboralesMedico, mes, anio }) => {
	const arrDiasTrabajo = diasLaboralesMedico.reduce((prev, curr) => {
		prev[curr] = true;

		return prev;
	}, {});

	console.log('TRANSFORMDATE');

	/**
	 * @type {Array.<string>}
	 */
	const MES_TITLE = [
		'ENERO',
		'FEBRERO',
		'MARZO',
		'ABRIL',
		'MAYO',
		'JUNIO',
		'JULIO',
		'AGOSTO',
		'SEPTIEMBRE',
		'OCTUBRE',
		'NOVIEMBRE',
		'DICIEMBRE',
	];

	// mes y año actual
	const fecha = new Date(anio, mes, 1);
	const fechaMesAnterior = new Date(anio, mes, 0);

	const ultimoDiasMesAnterior = fechaMesAnterior.getDate();
	const primerDiaSemanaMesActual = fecha.getDay();

	const ultimoDiaMes = new Date(anio, mes + 1, 0).getDate();

	const fechaActual = new Date();

	const dias = [];

	const diaSemana = {
		0: 7,
		1: 1,
		2: 2,
		3: 3,
		4: 4,
		5: 5,
		6: 6,
	};

	for (let i = diaSemana[primerDiaSemanaMesActual]; i > 1; i--) {
		const diaSemana = new Date(fechaMesAnterior);
		diaSemana.setDate(ultimoDiasMesAnterior - i + 2);

		dias.push({
			dia: diaSemana.getDate(),
			diaSemana: diaSemana.getDay(),
			id: `${diaSemana.getFullYear()}-${diaSemana.getMonth()}-${diaSemana.getDate()}`,
			diaLaboral: (arrDiasTrabajo[diaSemana.getDay()] && diaSemana >= fechaActual) || false,
			fecha: `${diaSemana.getFullYear()}-${diaSemana.getMonth() + 1}-${diaSemana.getDate()}`,
		});
	}

	for (let i = 1; i <= ultimoDiaMes; i++) {
		const diaSemana = new Date(fecha);
		diaSemana.setDate(i);

		dias.push({
			dia: diaSemana.getDate(),
			diaSemana: diaSemana.getDay(),
			id: `${diaSemana.getFullYear()}-${diaSemana.getMonth()}-${diaSemana.getDate()}`,
			diaLaboral: (arrDiasTrabajo[diaSemana.getDay()] && diaSemana >= fechaActual) || false,
			fecha: `${diaSemana.getFullYear()}-${diaSemana.getMonth() + 1}-${diaSemana.getDate()}`,
		});
	}

	const calendario = {
		anio,
		numMes: mes,
		mes: MES_TITLE[mes],
		diaSemana: fecha.getDay(),
		diaMes: fecha.getDate(),

		dias,
	};

	return calendario;
};

export default transformDate;
