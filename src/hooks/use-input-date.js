import { useEffect, useState } from 'react';
import transformDate from '../helpers/transform-date';

const useInputDate = ({ diasLaboralesMedico, selectedYear, selectedMonth }) => {
	const [fechaActual] = useState(new Date());
	const [mes, setMes] = useState(selectedMonth || new Date().getMonth());
	const [anio, setAnio] = useState(selectedYear || new Date().getFullYear());
	// const [calendario, setCalendario] = useState(transformDate({ diasLaboralesMedico, mes, anio }));
	const [calendario, setCalendario] = useState([]);
	const [diasSemana] = useState(['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']);

	useEffect(() => {
		// setCalendario(transformDate({ diasLaboralesMedico, mes, anio }));

		transformDate({ diasLaboralesMedico, mes, anio }).then(arrCalendario => {
			setCalendario(arrCalendario);
		});
	}, [mes]);

	const mesSiguiente = () => {
		if (mes < 11) return setMes(mes + 1);

		setMes(0);
		setAnio(anio + 1);
		// setAnio(anio);
	};

	const mesAnterior = () => {
		if (mes > fechaActual.getMonth() || anio > fechaActual.getFullYear()) {
			if (mes > 0) return setMes(mes - 1);

			setMes(11);
			setAnio(anio - 1);
		}
	};

	return {
		calendario,
		mesSiguiente,
		mesAnterior,
		mes,
		anio,
		fechaActual,
		diasSemana,
	};
};

export default useInputDate;
